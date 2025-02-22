const {
  getUserOrders,
  createNewOrder,
  getStoreOrders,
  PaymentNotifications,
} = require('../../controllers/order');
const router = require('express').Router();
const isAuthenticate = require('../../middleware/isAuthenticate');

router.get('/', isAuthenticate, getUserOrders);
router.post('/', isAuthenticate, createNewOrder);
router.post('/notification', PaymentNotifications);
router.get('/store', isAuthenticate, getStoreOrders);

module.exports = router;
