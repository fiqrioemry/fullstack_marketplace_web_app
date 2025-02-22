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
const router = require('express').Router();
const isAuthenticate = require('../../middleware/isAuthenticate');

router.post('/login', login);
router.post('/send-otp', sendOTP);
router.post('/register', register);
router.post('/refresh', refreshToken);
router.post('/verify-otp', verifyOTP);
router.get('/me', isAuthenticate, authCheck);
router.post('/logout', isAuthenticate, logout);
router.post('/open-store', isAuthenticate, createStore);

module.exports = router;
