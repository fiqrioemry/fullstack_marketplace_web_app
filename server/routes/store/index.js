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
  upload('image').array('files'),
  createProduct,
);
router.put(
  '/product',
  isAuthenticate,
  upload('image').array('files'),
  updateProduct,
);

router.delete('/product', isAuthenticate, deleteProduct);
module.exports = router;
