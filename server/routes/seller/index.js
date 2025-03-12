const {
  cancelOrder,
  proceedOrder,
  getOrderDetail,
  getAllStoreOrders,
  updateShipmentStatus,
  getStoreStatisticSummary,
} = require('../../controllers/seller');
const router = require('express').Router();
const isSeller = require('../../middleware/isSeller');
const isAuthenticate = require('../../middleware/isAuthenticate');

router.get('/statistic', isAuthenticate, isSeller, getStoreStatisticSummary);
router.get('/orders', isAuthenticate, isSeller, getAllStoreOrders);
router.get('/orders/:orderId', isAuthenticate, isSeller, getOrderDetail);
router.put('/orders/:orderId/cancel', isAuthenticate, isSeller, cancelOrder);
router.put('/orders/:orderId/process', isAuthenticate, isSeller, proceedOrder);
router.put(
  '/orders/:orderId/shipment',
  isAuthenticate,
  isSeller,
  updateShipmentStatus,
);

module.exports = router;
