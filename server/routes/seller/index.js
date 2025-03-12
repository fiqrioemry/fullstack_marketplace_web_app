const {
  cancelOrder,
  proceedOrder,
  getOrderDetail,
  getAllStoreOrders,
  updateShipmentStatus,
} = require('../../controllers/seller');
const router = require('express').Router();
const isSeller = require('../../middleware/isSeller');
const isAuthenticate = require('../../middleware/isAuthenticate');

router.get('/orders', isAuthenticate, isSeller, getAllStoreOrders);
router.get('/orders/:orderId', isAuthenticate, isSeller, getOrderDetail);
router.put('/orders/:orderId', isAuthenticate, isSeller, proceedOrder);
router.put('/orders/:orderId', isAuthenticate, isSeller, cancelOrder);
router.put(
  '/orders/:orderId/shipment',
  isAuthenticate,
  isSeller,
  updateShipmentStatus,
);

module.exports = router;
