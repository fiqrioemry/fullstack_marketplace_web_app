const crypto = require("crypto");
const { reset } = require("../models");

module.exports = (user) => {
  // Generating Unique Token
  const token = crypto.randomBytes(20).toString("hex");
  const expires = Date.now() + 10 * 60 * 1000; // 10 Minute expired

  // Hashing and adding unique token to database table
  reset.create(
    { userId: user.id, token, ExpiresAt: expires },
    { where: { email: user.email } }
  );

  return resetToken;
};
