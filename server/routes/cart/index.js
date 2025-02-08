const express = require('express');
const {
  getAllCartItem,
  addCart,
  updateCart,
  deleteCart,
} = require('../../controllers/cart');
const isAuthenticate = require('../../middleware/isAuthenticate');
const router = express.Router();

router.post('/', isAuthenticate, addCart);
router.put('/:id', isAuthenticate, updateCart);
router.get('/', isAuthenticate, getAllCartItem);
router.delete('/:id', isAuthenticate, deleteCart);

module.exports = router;
