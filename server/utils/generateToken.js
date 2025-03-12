require('dotenv').config;
const jwt = require('jsonwebtoken');

const generateAccessToken = (user, expiresIn = '1d') => {
  if (!user || !user.id) {
    throw new Error('User object must contain an id.');
  }

  const accessToken = jwt.sign(
    {
      userId: user.id,
      storeId: user.store?.id || null,
      role: user.role,
    },
    process.env.ACCESS_TOKEN,
    { expiresIn },
  );

  return accessToken;
};

const generateRefreshToken = (user, expiresIn = '7d') => {
  if (!user || !user.id) {
    throw new Error('User object must contain an id.');
  }

  const refreshToken = jwt.sign(
    {
      userId: user.id,
      storeId: user.store?.id || null,
      role: user.role,
    },
    process.env.REFRESH_TOKEN,
    {
      expiresIn,
    },
  );
  return refreshToken;
};

module.exports = { generateAccessToken, generateRefreshToken };
