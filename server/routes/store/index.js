const express = require("express");
const {
  createProduct,
  getAllStoreProducts,
} = require("../../controllers/store");
const { upload } = require("../../middleware/media");
const isAuthenticate = require("../../middleware/isAuthenticate");
const router = express.Router();

router.get("/:slug", getStoreInfo);
router.get("/:slug/product", getAllStoreProducts);
router.post(
  "/product",
  isAuthenticate,
  upload("image").array("files"),
  createProduct
);

module.exports = router;
