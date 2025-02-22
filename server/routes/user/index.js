const {
  getProfile,
  updateProfile,
  getAddress,
  addAddress,
  updateAddress,
  deleteAddress,
} = require('../../controllers/user');
const router = require('express').Router();
const { upload } = require('../../middleware/media');
const isAuthenticate = require('../../middleware/isAuthenticate');

router.put(
  '/profile',
  isAuthenticate,
  upload().single('avatar'),
  updateProfile,
);
router.get('/profile', isAuthenticate, getProfile);
router.get('/profile/address', isAuthenticate, getAddress);
router.post('/profile/address', isAuthenticate, addAddress);
router.put('/profile/address/:addressId', isAuthenticate, updateAddress);
router.delete('/profile/address/:addressId', isAuthenticate, deleteAddress);

module.exports = router;
