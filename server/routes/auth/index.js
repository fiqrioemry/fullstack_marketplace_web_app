const {
  userSignUp,
  userSignIn,
  userSignOut,
  userAuthCheck,
  userAuthRefresh,
  resetPassword,
  sendOtpSignUp,
  verifyOtpSignUp,
  userOpenStore,
} = require("../../controllers/auth");
const express = require("express");
const isAuthenticate = require("../../middleware/isAuthenticate");
const router = express.Router();

router.post("/signin", userSignIn);
router.post("/signup", userSignUp);
router.post("/send-otp", sendOtpSignUp);
router.get("/refresh", userAuthRefresh);
router.put("/reset/:token", resetPassword);
router.post("/verify-otp", verifyOtpSignUp);
router.get("/me", isAuthenticate, userAuthCheck);
router.post("/signout", isAuthenticate, userSignOut);
router.post("/open-store", isAuthenticate, userOpenStore);

module.exports = router;
 