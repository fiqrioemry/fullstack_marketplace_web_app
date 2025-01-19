const express = require("express");
const {
  getAllCategory,
  updateCategory,
  deleteCategory,
  createCategory,
} = require("../../controllers/category");
const isAdmin = require("../../middleware/isAuthenticate");
const isAuthenticate = require("../../middleware/isAuthenticate");
const router = express.Router();

router.get("/", getAllCategory);
router.post("/", isAdmin, isAuthenticate, createCategory);
router.put("/:id", isAdmin, isAuthenticate, updateCategory);
router.delete("/:id", isAdmin, isAuthenticate, deleteCategory);

module.exports = router;
