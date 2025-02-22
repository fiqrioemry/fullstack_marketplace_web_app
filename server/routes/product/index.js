const router = require('express').Router();
const { getProduct, getProducts } = require('../../controllers/product');

router.get('/', getProducts);
router.get('/:slug', getProduct);

module.exports = router;
