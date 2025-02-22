const {
  getCategories,
  updateCategory,
  deleteCategory,
  createCategory,
} = require('../../controllers/category');
const router = require('express').Router();
const isAdmin = require('../../middleware/isAuthenticate');
const isAuthenticate = require('../../middleware/isAuthenticate');

router.get('/', getCategories);
router.post('/', isAdmin, isAuthenticate, createCategory);
router.put('/:id', isAdmin, isAuthenticate, updateCategory);
router.delete('/:id', isAdmin, isAuthenticate, deleteCategory);

module.exports = router;
