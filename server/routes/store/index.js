const {
  getStoreInfo,
  createProduct,
  updateProduct,
  deleteProduct,
  getMyStoreProfile,
  getMyStoreProducts,
} = require('../../controllers/store');
const router = require('express').Router();
const { upload } = require('../../middleware/media');

const isAuthenticate = require('../../middleware/isAuthenticate');
const isSeller = require('../../middleware/isSeller');

router.get('/product', isAuthenticate, getMyStoreProducts);
router.get('/', isAuthenticate, getMyStoreProfile);
router.get('/:slug', getStoreInfo);
router.post(
  '/product',
  isAuthenticate,
  isSeller,
  upload().array('images', 5),
  createProduct,
);
router.put(
  '/product/:productId',
  isAuthenticate,
  isSeller,
  upload().array('images', 5),
  updateProduct,
);

router.delete('/product/:productId', isAuthenticate, deleteProduct);

module.exports = router;
