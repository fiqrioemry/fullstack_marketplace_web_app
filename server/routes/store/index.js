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

router.get('/product', isAuthenticate, getMyStoreProducts);
router.get('/', isAuthenticate, getMyStoreProfile);
router.get('/:slug', getStoreInfo);
router.post('/product', isAuthenticate, upload().array('files'), createProduct);
router.put(
  '/product/:productId',
  isAuthenticate,
  upload().array('files'),
  updateProduct,
);

router.delete('/product/:productId', isAuthenticate, deleteProduct);

module.exports = router;
