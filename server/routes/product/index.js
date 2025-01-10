const express = require("express");
const {
  getProduct,
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../../controllers/product");
const isAuthenticate = require("../../middleware/isAuthenticate");
const router = express.Router();

router.get("/", isAuthenticate, getAllProducts);
router.get("/:slug", isAuthenticate, getProduct);
router.post("/", isAuthenticate, createProduct);
router.put("/:productId", isAuthenticate, updateProduct);
router.delete("/:productId", isAuthenticate, deleteProduct);

module.exports = router;
