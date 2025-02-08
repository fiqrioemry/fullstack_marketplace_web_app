const express = require('express');
const { createNewOrder, getAllOrders } = require('../../controllers/order');
const isAuthenticate = require('../../middleware/isAuthenticate');
const router = express.Router();
router.get('/', isAuthenticate, getAllOrders);
router.post('/', isAuthenticate, createNewOrder);

module.exports = router;
