const express = require('express');
const {
  getUserOrders,
  createNewOrder,
  getStoreOrders,
  PaymentNotifications,
} = require('../../controllers/order');
const isAuthenticate = require('../../middleware/isAuthenticate');
const router = express.Router();

router.get('/', isAuthenticate, getUserOrders);
router.get('/store', isAuthenticate, getStoreOrders);
router.post('/', isAuthenticate, createNewOrder);
router.post('/notification', PaymentNotifications);

module.exports = router;
