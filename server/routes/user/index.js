const {
  getProfile,
  addAddress,
  updateAddress,
  deleteAddress,
  updateProfile,
} = require("../../controllers/user");
const express = require("express");
const isAuthenticate = require("../../middleware/isAuthenticate");
const router = express.Router();

router.get("/profile", isAuthenticate, getProfile);
router.post("/address", isAuthenticate, addAddress);
router.put("/profile", isAuthenticate, updateProfile);
router.put("/address/:addressId", isAuthenticate, updateAddress);
router.delete("/address/:addressId", isAuthenticate, deleteAddress);

module.exports = router;
