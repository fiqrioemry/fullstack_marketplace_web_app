const express = require('express');
const { getProduct, getAllProducts } = require('../../controllers/product');
const router = express.Router();

router.get('/', getAllProducts);
router.get('/:slug', getProduct);

module.exports = router;
