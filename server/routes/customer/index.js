const {
  cancelOrder,
  getAllOrders,
  getOrderDetail,
  cancelTransaction,
  getShipmentDetail,
  getAllTransactions,
  PaymentNotifications,
  createNewTransaction,
  getTransactionDetail,
  confirmOrderDelivery,
  getAllUserNotifications,
} = require('../../controllers/customer');
const router = require('express').Router();
const isAuthenticate = require('../../middleware/isAuthenticate');

router.get('/notifications', isAuthenticate, getAllUserNotifications);
router.get(
  '/transactions/:transactionId',
  isAuthenticate,
  getTransactionDetail,
);

router.get('/orders', isAuthenticate, getAllOrders);
router.get('/orders/:orderId', isAuthenticate, getOrderDetail);
router.get('/orders/:orderId/shipment', isAuthenticate, getShipmentDetail);
router.put('/orders/:orderId/confirm', isAuthenticate, confirmOrderDelivery);

router.get('/transactions', isAuthenticate, getAllTransactions);
router.post('/transactions/notifications', PaymentNotifications);
router.post('/transactions', isAuthenticate, createNewTransaction);
router.put(
  '/transactions/:transactionId/cancel',
  isAuthenticate,
  cancelTransaction,
);

router.put('/orders/:orderId/cancel', isAuthenticate, cancelOrder);

module.exports = router;
