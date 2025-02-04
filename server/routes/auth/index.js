const {
  login,
  logout,
  sendOTP,
  register,
  authCheck,
  verifyOTP,
  createStore,
  refreshToken,
  resetPassword,
} = require('../../controllers/auth');
const express = require('express');
const isAuthenticate = require('../../middleware/isAuthenticate');
const router = express.Router();

router.post('/login', login);
router.post('/send-otp', sendOTP);
router.post('/register', register);
router.get('/refresh', refreshToken);
router.post('/verify-otp', verifyOTP);
router.put('/reset/:token', resetPassword);
router.get('/me', isAuthenticate, authCheck);
router.post('/logout', isAuthenticate, logout);
router.post('/open-store', isAuthenticate, createStore);

module.exports = router;
