const { Op } = require('sequelize');
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

async function getAllStoreOrders(req, res) {
  const storeId = req.user.storeId;
  try {
    const rawOrders = await Order.findAll({
      where: { storeId, orderStatus: { [Op.in]: ['pending', 'process'] } },
      include: ['orderDetail', 'address'],
    });

    if (!rawOrders)
      return res
        .status(200)
        .send({ message: 'You dont have any order', orders: [] });

    const orders = rawOrders.map((order) => ({
      id: order.id,
      orderNumber: order.orderNumber,
      totalPrice: order.totalPrice,
      shipmentCost: order.shipmentCost,
      totalAmount: order.totalOrderAmount,
      orderStatus: order.orderStatus,
      address: {
        name: order.address.name,
        address: order.address.address,
        zipcode: order.address.zipcode,
        phone: order.address.phone,
      },
      details: order.orderDetail.map((order) => ({
        product: order.product,
        quantity: order.quantity,
        price: order.price,
        totalPrice: order.totalPrice,
      })),
    }));

    return res.status(200).json({ orders });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

async function getOrderDetail(req, res) {
  const storeId = req.user.storeId;
  const orderId = req.params.orderId;
  try {
    const rawData = await OrderDetail.findOne({
      where: { storeId, orderStatus: { [Op.in]: ['pending', 'process'] } },
      include: ['orderDetail', 'address'],
    });

    if (!rawOrders)
      return res
        .status(200)
        .send({ message: 'You dont have any order', orders: [] });

    const orders = rawOrders.map((order) => ({
      id: order.id,
      orderNumber: order.orderNumber,
      totalPrice: order.totalPrice,
      shipmentCost: order.shipmentCost,
      totalAmount: order.totalOrderAmount,
      orderStatus: order.orderStatus,
    }));

    return res.status(200).json({ orders });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

module.exports = {
  getAllStoreOrders,
  getOrderDetail,
};
