require('dotenv').config;
const jwt = require('jsonwebtoken');

const generateAccessToken = (user, expiresIn = '1d') => {
  if (!user || !user.id) {
    throw new Error('User object must contain an id.');
  }

  return jwt.sign(
    {
      userId: user.id,
      storeId: user.store?.id || null,
      role: user.role,
    },
    process.env.ACCESS_TOKEN,
    { expiresIn },
  );
};

// Generate Refresh Token (Long-lived)
const generateRefreshToken = (user, expiresIn = '7d') => {
  if (!user || !user.id) {
    throw new Error('User object must contain an id.');
  }

  return jwt.sign({ userId: user.id }, process.env.REFRESH_TOKEN, {
    expiresIn,
  });
};

module.exports = { generateAccessToken, generateRefreshToken };
