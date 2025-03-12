const {
  getAllOrders,
  getOrderDetail,
  getAllTransactions,
  PaymentNotifications,
  createNewTransaction,
  getTransactionDetail,
  getDashboardSummary,
  getOrderShipmentDetail,
} = require('../../controllers/customer');
const router = require('express').Router();
const isAuthenticate = require('../../middleware/isAuthenticate');

router.get('/summary', isAuthenticate, getDashboardSummary);
router.get('/transactions', isAuthenticate, getAllTransactions);
router.post('/transactions', isAuthenticate, createNewTransaction);
router.get(
  '/transactions/:transactionId',
  isAuthenticate,
  getTransactionDetail,
);
router.post('/transactions/notifications', PaymentNotifications);

router.get('/orders', isAuthenticate, getAllOrders);
router.get('/orders/:orderId', isAuthenticate, getOrderDetail);
router.get('/orders/:orderId/shipment', isAuthenticate, getOrderShipmentDetail);

module.exports = router;
