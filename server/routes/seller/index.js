const {
  getOrderDetail,
  getAllStoreOrders,
} = require('../../controllers/seller');
const isSeller = require('../../middleware/isSeller');
const isAuthenticate = require('../../middleware/isAuthenticate');

const router = require('express').Router();
router.get('/orders', isAuthenticate, isSeller, getAllStoreOrders);
router.get('/orders/:orderId', isAuthenticate, isSeller, getOrderDetail);

module.exports = router;
