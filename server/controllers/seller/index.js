const {
  User,
  Order,
  Address,
  Product,
  sequelize,
  Shipment,
  OrderDetail,
  Notification,
} = require('../../models');
const { Op } = require('sequelize');
const cron = require('node-cron');

async function autoCompleteOrders() {
  try {
    const twoDaysAgo = new Date();
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

    const ordersToUpdate = await Order.findAll({
      where: {
        orderStatus: 'delivered',
        updatedAt: { [Op.lte]: twoDaysAgo },
      },
    });

    if (ordersToUpdate.length === 0) {
      console.log('Tidak ada pesanan yang perlu diperbarui.');
      return;
    }

    // Update setiap pesanan dalam transaksi terpisah
    for (const order of ordersToUpdate) {
      const transaction = await sequelize.transaction();
      try {
        // Ubah status order menjadi "success"
        await order.update({ orderStatus: 'success' }, { transaction });

        // Ambil semua order detail untuk order ini
        const orderDetails = await OrderDetail.findAll({
          where: { orderId: order.id },
          transaction,
        });

        // Update jumlah sold pada product
        for (const detail of orderDetails) {
          await Product.update(
            {
              sold: sequelize.literal(`COALESCE(sold, 0) + ${detail.quantity}`),
            },
            { where: { id: detail.productId }, transaction },
          );
        }

        // Tambahkan balance ke store
        await Store.update(
          { balance: sequelize.literal(`balance + ${order.totalOrderAmount}`) },
          { where: { id: order.storeId }, transaction },
        );

        // Buat notifikasi ke store
        await Notification.create(
          {
            userId: order.userId,
            storeId: order.storeId,
            type: 'order',
            message:
              'Your order has been marked as successful and the store balance has been updated.',
          },
          { transaction },
        );

        await transaction.commit();
        console.log(
          `Order #${order.id} berhasil diperbarui ke status "success".`,
        );
      } catch (error) {
        await transaction.rollback();
        console.error(`Gagal memperbarui Order #${order.id}:`, error.message);
      }
    }
  } catch (error) {
    console.error(
      'Kesalahan dalam cron job autoCompleteOrders:',
      error.message,
    );
  }
}

// Jalankan Cron Job setiap hari pukul 00:00
cron.schedule('0 0 * * *', () => {
  console.log('Menjalankan Cron Job untuk memperbarui status order...');
  autoCompleteOrders();
});

async function getAllStoreOrders(req, res) {
  const storeId = req.user.storeId;
  try {
    const orders = await Order.findAll({
      where: {
        storeId,
        orderStatus: { [Op.in]: ['pending', 'process', 'success'] },
      },
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

async function proceedOrder(req, res) {
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
        metadata: { shipmentNumber: shipmentNumber },
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

    const user = await User.findByPk(order.userId, { transaction });

    if (!user) {
      await transaction.rollback();
      return res.status(404).json({ message: 'User Not Found' });
    }

    // Kembalikan saldo pengguna berdasarkan total harga pesanan
    await user.update(
      { balance: sequelize.literal(`balance + ${order.totalOrderAmount}`) },
      { transaction },
    );

    // Kembalikan stok produk berdasarkan orderDetail
    for (const item of order.orderDetail) {
      await Product.update(
        { quantity: item.quantity },
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
        storeId,
        type: 'order',
        userId: order.userId,
        message: 'Your order has been canceled and your balance refunded.',
        metadata: { orderId: order.id, orderNumber: order.orderNumber },
      },
      { transaction },
    );

    await transaction.commit();
    return res.status(200).send({
      message: 'Order is canceled',
    });
  } catch (error) {
    await transaction.rollback();
    return res.status(500).json({ message: error.message });
  }
}

// Khusus untuk courier {simulasi pengiriman telah berhasil diterima}
async function updateShipmentStatus(req, res) {
  const orderId = req.params.orderId;
  const transaction = await sequelize.transaction();
  try {
    const order = await Order.findByPk(orderId, {
      transaction,
    });

    if (!order) {
      await transaction.rollback();
      return res.status(404).json({ message: 'Order Not Found' });
    }

    await Shipment.update(
      { shipmentStatus: 'delivered' },
      { where: { orderId }, transaction },
    );

    await Notification.create(
      {
        storeId,
        type: 'order',
        userId: order.userId,
        message: 'Your Order has been Delivered.',
      },
      { transaction },
    );

    await transaction.commit();
    return res.status(200).send({
      message: 'Shipment is Delivered',
    });
  } catch (error) {
    await transaction.rollback();
    return res.status(500).json({ message: error.message });
  }
}

module.exports = {
  updateShipmentStatus,
  getAllStoreOrders,
  getOrderDetail,
  proceedOrder,
  cancelOrder,
};
