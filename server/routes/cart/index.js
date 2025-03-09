const {
  addCart,
  updateCart,
  removeCart,
  getCarts,
} = require('../../controllers/cart');
const router = require('express').Router();
const isAuthenticate = require('../../middleware/isAuthenticate');

router.get('/', isAuthenticate, getCarts);
router.post('/', isAuthenticate, addCart);
router.put('/:id', isAuthenticate, updateCart);
router.delete('/:id', isAuthenticate, removeCart);

module.exports = router;
