const express = require("express");
const {
  verifyOtp,
  userSignUp,
  userSignIn,
  userSignOut,
  userAuthCheck,
  userAuthRefresh,
  resetPassword,
} = require("../../controllers/auth");
const isAuthenticate = require("../../middleware/isAuthenticate");
const router = express.Router();

router.post("/signup", userSignUp);
router.post("/signin", userSignIn);
router.post("/signout", userSignOut);
router.get("/verify/:token", verifyOtp);
router.get("/refresh", userAuthRefresh);
router.get("/me", isAuthenticate, userAuthCheck);
router.put("/reset/:token", resetPassword);

module.exports = router;
