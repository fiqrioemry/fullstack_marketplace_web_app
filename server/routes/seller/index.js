const isSeller = require('../../middleware/isSeller');
const { getAllStoreOrders } = require('../../controllers/seller');
const isAuthenticate = require('../../middleware/isAuthenticate');
const router = require('express').Router();
router.get('/orders', isAuthenticate, isSeller, getAllStoreOrders);

module.exports = router;
