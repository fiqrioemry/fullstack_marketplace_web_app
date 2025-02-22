const crypto = require('crypto');

const generateToken = (expiryMinutes = 10) => {
  const token = crypto.randomBytes(20).toString('hex');
  const expiresAt = Date.now() + expiryMinutes * 60 * 1000; // Default 10 minutes expiry

  return { token, expiresAt };
};

module.exports = generateToken;
