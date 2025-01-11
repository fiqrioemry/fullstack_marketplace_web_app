const {
  userSignUp,
  userSignIn,
  userSignOut,
  userAuthCheck,
  userAuthRefresh,
  resetPassword,
  sendOtpSignUp,
  verifyOtpSignUp,
} = require("../../controllers/auth");
const express = require("express");
const isAuthenticate = require("../../middleware/isAuthenticate");
const router = express.Router();

router.post("/signin", userSignIn);
router.post("/signout", userSignOut);
router.get("/refresh", userAuthRefresh);
router.get("/me", isAuthenticate, userAuthCheck);
router.put("/reset/:token", resetPassword);

router.post("/signup", userSignUp);
router.post("/send-otp", sendOtpSignUp);
router.post("/verify-otp", verifyOtpSignUp);

module.exports = router;
