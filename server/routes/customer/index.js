const {
  getAllOrders,
  getOrderDetail,
  getAllTransactions,
  PaymentNotifications,
  createNewTransaction,
  getTransactionDetail,
  getOrderShipmentDetail,
  confirmOrderDelivery,
  cancelOrder,
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
router.put('/orders/:orderId/cancel', isAuthenticate, cancelOrder);
router.put('/orders/:orderId/confirm', isAuthenticate, confirmOrderDelivery);
router.get('/orders/:orderId/shipment', isAuthenticate, getOrderShipmentDetail);

router.get('/transactions', isAuthenticate, getAllTransactions);
router.post('/transactions/notifications', PaymentNotifications);
router.post('/transactions', isAuthenticate, createNewTransaction);
getOrderDetail: async (orderId) => {
  return authInstance
    .get(`/customer/orders/${orderId}`)
    .then((res) => res.data)
    .catch(errorHandle);
},
  (module.exports = router);
