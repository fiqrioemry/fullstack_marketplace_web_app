const {
  getUserTransactions,
  createNewTransaction,
  getStoreOrders,
  updateOrderStatus,
  PaymentNotifications,
} = require('../../controllers/order');
const router = require('express').Router();
const isAuthenticate = require('../../middleware/isAuthenticate');

router.get('/', isAuthenticate, getUserTransactions);
router.post('/', isAuthenticate, createNewTransaction);
router.post('/notification', PaymentNotifications);
router.get('/store', isAuthenticate, getStoreOrders);
router.put('/store', isAuthenticate, updateOrderStatus);

module.exports = router;
