const {
  getAllOrders,
  getOrderDetail,
  getAllTransactions,
  PaymentNotifications,
  createNewTransaction,
  getTransactionDetail,
  getOrderShipmentDetail,
  getDashboardSummary,
} = require('../../controllers/order');
const router = require('express').Router();
const isAuthenticate = require('../../middleware/isAuthenticate');

router.get('/summary', isAuthenticate, getDashboardSummary);
router.get('/transactions', isAuthenticate, getAllTransactions);
router.post('/transactions', isAuthenticate, createNewTransaction);
router.get('/notifications', isAuthenticate, PaymentNotifications);
router.get(
  '/transactions/:transactionId',
  isAuthenticate,
  getTransactionDetail,
);

router.get('/', isAuthenticate, getAllOrders);
router.get('/:orderId', isAuthenticate, getOrderDetail);
router.get('/:orderId/shipment', isAuthenticate, getOrderShipmentDetail);

module.exports = router;
