const {
  Cart,
  Order,
  Address,
  Product,
  sequelize,
  Shipment,
  Transaction,
  OrderDetail,
  Notification,
} = require('../../models');
const { Op } = require('sequelize');

async function getAllStoreOrders(req, res) {
  const storeId = req.user.storeId;
  try {
    const orders = await Order.findAll({
      where: { storeId, orderStatus: { [Op.in]: ['pending', 'process'] } },
    });

    if (!orders)
      return res
        .status(200)
        .json({ message: 'You dont have any order', orders: [] });

    return res.status(200).json({ orders });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

async function getOrderDetail(req, res) {
  const orderId = req.params.orderId;
  try {
    const order = await Order.findOne({
      where: { id: orderId },
      include: [
        { model: OrderDetail, as: 'orderDetail', include: ['product'] },
        { model: Address, as: 'address' },
      ],
    });

    if (!order) return res.status(404).json({ message: 'Order Not Found' });

    return res.status(200).json({ order });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

async function proceedOrderForShipment(req, res) {
  const storeId = req.user.storeId;
  const orderId = req.params.orderId;
  const shipmentNumber = req.body.shipmentNumber;

  if (!shipmentNumber)
    return res.status(400).send({ message: 'Shipment number required' });

  const transaction = await sequelize.transaction();

  try {
    // Cek apakah pesanan ada
    const order = await Order.findByPk(orderId, { transaction });
    if (!order) {
      await transaction.rollback();
      return res.status(404).json({ message: 'Order Not Found' });
    }

    // Update status pengiriman
    await Shipment.update(
      { shipmentNumber, shipmentStatus: 'shipped' },
      { where: { orderId }, transaction },
    );

    // Update status order
    await order.update({ orderStatus: 'process' }, { transaction });

    // Buat notifikasi
    await Notification.create(
      {
        userId: order.userId,
        storeId,
        type: 'order',
        message: 'Your order has been proceeded for shipment',
        metadata: shipmentNumber,
      },
      { transaction },
    );

    await transaction.commit();
    return res.status(200).send({ message: 'Order Proceeded for shipment' });
  } catch (error) {
    await transaction.rollback();
    return res.status(500).json({ message: error.message });
  }
}

async function cancelOrder(req, res) {
  const storeId = req.user.storeId;
  const orderId = req.params.orderId;
  const transaction = await sequelize.transaction();

  try {
    // Cek apakah pesanan ada
    const order = await Order.findByPk(orderId, {
      include: [{ model: OrderDetail, as: 'orderDetail' }],
      transaction,
    });

    if (!order) {
      await transaction.rollback();
      return res.status(404).json({ message: 'Order Not Found' });
    }

    // Ambil user
    const user = await User.findByPk(order.userId, { transaction });

    if (!user) {
      await transaction.rollback();
      return res.status(404).json({ message: 'User Not Found' });
    }

    // Kembalikan saldo pengguna berdasarkan total harga pesanan
    await user.update(
      { balance: sequelize.literal(`balance + ${order.totalPrice}`) },
      { transaction },
    );

    // Kembalikan stok produk berdasarkan orderDetail
    for (const item of order.orderDetail) {
      await Product.update(
        { quantity: sequelize.literal(`quantity + ${item.quantity}`) },
        { where: { id: item.productId }, transaction },
      );
    }

    // Update status pengiriman ke 'canceled'
    await Shipment.update(
      { shipmentNumber: null, shipmentStatus: 'canceled' },
      { where: { orderId }, transaction },
    );

    // Update status pesanan ke 'canceled'
    await order.update({ orderStatus: 'canceled' }, { transaction });

    // Buat notifikasi
    await Notification.create(
      {
        userId: order.userId,
        storeId,
        type: 'order',
        message: 'Your order has been canceled and your balance refunded.',
        metadata: order.orderNumber,
      },
      { transaction },
    );

    // Commit transaksi jika semua berhasil
    await transaction.commit();
    return res.status(200).send({
      message: 'Order canceled, balance refunded, and stock updated.',
    });
  } catch (error) {
    await transaction.rollback();
    return res.status(500).json({ message: error.message });
  }
}

module.exports = {
  getAllStoreOrders,
  getOrderDetail,
  proceedOrder,
  cancelOrder,
};
