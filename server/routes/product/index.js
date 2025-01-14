const express = require("express");
const isAuthenticate = require("../../middleware/isAuthenticate");
const { getProduct, getAllProducts } = require("../../controllers/product");
const router = express.Router();

router.get("/", isAuthenticate, getAllProducts);
router.get("/:slug", isAuthenticate, getProduct);

module.exports = router;
