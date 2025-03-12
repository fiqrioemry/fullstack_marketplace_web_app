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
    const orders = await Order.findAll({
      where: { storeId, orderStatus: { [Op.in]: ['pending', 'process'] } },
      include: ['orderDetail', 'address'],
    });

    return res.status(200).json({ orders });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

module.exports = {
  getAllStoreOrders,
};
