const express = require('express');
const {
  getStoreInfo,
  createProduct,
  updateProduct,
  deleteProduct,
  getMyStoreProfile,
  getMyStoreProducts,
} = require('../../controllers/store');
const { upload } = require('../../middleware/media');
const isAuthenticate = require('../../middleware/isAuthenticate');
const router = express.Router();

router.get('/product', isAuthenticate, getMyStoreProducts);
router.get('/', isAuthenticate, getMyStoreProfile);
router.get('/:slug', getStoreInfo);
router.post(
  '/product',
  isAuthenticate,
  upload('image').array('images'),
  createProduct,
);
router.put(
  '/product/:productId',
  isAuthenticate,
  upload('image').array('images'),
  updateProduct,
);

router.delete('/product/:productId', isAuthenticate, deleteProduct);
module.exports = router;
