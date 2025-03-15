const {
  cancelTransaction,
  getAllOrders,
  getOrderDetail,
  getShipmentDetail,
  getAllTransactions,
  PaymentNotifications,
  createNewTransaction,
  getTransactionDetail,
  confirmOrderDelivery,
} = require('../../controllers/customer');
const router = require('express').Router();
const isAuthenticate = require('../../middleware/isAuthenticate');

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
  '/transaction/:transactionId/cancel',
  isAuthenticate,
  cancelTransaction,
);
module.exports = router;
