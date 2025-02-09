const express = require('express');
const {
  createNewOrder,
  getAllOrders,
  PaymentNotifications,
} = require('../../controllers/order');
const isAuthenticate = require('../../middleware/isAuthenticate');
const router = express.Router();

router.get('/', isAuthenticate, getAllOrders);
router.post('/', isAuthenticate, createNewOrder);
router.post('/notification', PaymentNotifications);

module.exports = router;
