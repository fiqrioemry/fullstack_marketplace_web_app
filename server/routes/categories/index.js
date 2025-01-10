const express = require("express");
const {
  getAllCategories,
  updateCategory,
  deleteCategory,
  createCategory,
} = require("../../controllers/categories");
const isAdmin = require("../../middleware/isAuthenticate");
const isAuthenticate = require("../../middleware/isAuthenticate");
const router = express.Router();

router.get("/", getAllCategories);
router.post("/", isAdmin, isAuthenticate, createCategory);
router.put("/:id", isAdmin, isAuthenticate, updateCategory);
router.delete("/:id", isAdmin, isAuthenticate, deleteCategory);

module.exports = router;
