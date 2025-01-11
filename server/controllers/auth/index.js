const bcrypt = require("bcrypt");
const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");
const speakeasy = require("speakeasy");
const sendOtp = require("../../utils/sendOtp");
const { client } = require("../../utils/redis");
const { User, Store, Reset } = require("../../models");
const randomAvatar = require("../../utils/randomAvatar");
const resetPasswordToken = require("../../utils/resetPasswordToken");
const createEmailTemplate = require("../../utils/createEmailTemplate");

async function sendOtpSignUp(req, res) {
  const { email } = req.body;

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).send({ message: "Email already registered" });
    }

    const secret = speakeasy.generateSecret({ length: 20 });
    const otp = speakeasy.totp({
      secret: secret.base32,
      encoding: "base32",
    });

    await client.setEx(`otp:${email}`, 300, otp);

    await sendOtp(email, otp);
    return res
      .status(200)
      .send({ success: true, message: "OTP sent to email" });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Failed to send OTP", error: error.message });
  }
}

async function verifyOtpSignUp(req, res) {
  const { email, otp } = req.body;

  try {
    const storedOtp = await client.get(`otp:${email}`);

    if (!storedOtp) {
      return res.status(400).send({ message: "OTP is expired" });
    }

    if (storedOtp !== otp) {
      return res.status(400).send({ message: "Invalid OTP code" });
    } else {
      return res
        .status(200)
        .send({ success: true, message: "OTP is verified." });
    }
  } catch (error) {
    return res
      .status(500)
      .send({ message: "An error occurred", error: error.message });
  }
}

async function userSignUp(req, res) {
  const { fullname, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const newUser = await User.create({
      fullname,
      email,
      password: hashedPassword,
      avatar: randomAvatar(),
    });

    res.status(201).send({
      message: "Sign up is success",
      user: newUser,
    });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Failed to register user", error: error.message });
  }
}

async function userSignIn(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(401).send({ message: "All Field required" });
    }

    // Query paralel
    const user = await User.findOne({
      where: { email },
      attributes: ["id"],
    });

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    const accessToken = jwt.sign(
      { userId: user.id },
      process.env.ACCESS_TOKEN,
      {
        expiresIn: "1d",
      }
    );

    const refreshToken = jwt.sign(
      { userId: user.id },
      process.env.REFRESH_TOKEN,
      {
        expiresIn: "7d",
      }
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      secure: process.env.ENVIRONMENT === "production",
    });

    return res.status(200).send({
      message: "Login is success",
      data: accessToken,
    });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "An error occurred", error: error.message });
  }
}

async function userSignOut(req, res) {
  delete req.headers.authorization;

  res.clearCookie("refreshToken");

  return res.status(200).send({ message: "Logout is success" });
}

async function userAuthCheck(req, res) {
  const { userId } = req.user;

  try {
    // get data with redis key
    const cachedUser = await client.get(`user:${userId}`);

    // return res if redis exist
    if (cachedUser) {
      return res.status(200).send({ data: JSON.parse(cachedUser) });
    }

    // fetch user data
    const user = await User.findByPk(userId, {
      attributes: [
        "id",
        "email",
        "fullname",
        "avatar",
        "role",
        "birthday",
        "gender",
        "phone",
      ],
      include: [
        { model: Store, as: "store", attributes: ["id", "name", "avatar"] },
      ],
    });

    // assign data value
    const payload = {
      userId: user.id,
      email: user.email,
      fullname: user.fullname,
      avatar: user.avatar,
      birthday: user.birthday,
      phone: user.phone,
      gender: user.gender,
      role: user.role,
      storeId: user.store?.id,
      storeName: user.store?.name,
      storeAvatar: user.store?.avatar,
    };

    // set expire in 15 min
    await client.setEx(`user:${userId}`, 900, JSON.stringify(payload));

    res.status(200).send({
      data: payload,
    });
  } catch (error) {
    return res.status(500).send({
      message: "Failed to get Authorization",
      error: error.message,
    });
  }
}

async function userAuthRefresh(req, res) {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(401).send({
        message: "Session is Expired, Please log in",
      });
    }

    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN);

    const userId = decoded.userId;

    const user = await User.findByPk(userId, { attributes: ["id"] });

    if (!user) {
      return res.status(403).send({
        message: "Invalid refresh token, please log in",
      });
    }

    const accessToken = jwt.sign(
      { userId: user.id },
      process.env.ACCESS_TOKEN,
      { expiresIn: "1d" }
    );

    res.status(200).send({
      success: true,
      data: { accessToken },
    });
  } catch (error) {
    return res.status(500).send({
      message: "Failed to refresh token",
      error: error.message,
    });
  }
}

async function resetPassword(req, res) {
  const token = req.params.token;
  try {
    const user = await Reset.findOne({
      where: { token, ExpiresAt: { [Op.gte]: new Date() } },
    });
    if (!user)
      return res.status(400).send({
        message: "Token is invalid or has been expired",
      });

    const { newPassword, newPasswordConfirm } = req.body;

    if (newPassword !== newPasswordConfirm) {
      return res.status(400).send({ message: "Password did not match" });
    }

    const newHashPassword = await bcrypt.hash(newPassword, 10);

    (await User.update(
      { password: newHashPassword },
      { where: { id: user.userId } }
    )) && Reset.destroy({ where: { userId: user.userId } });

    res.status(200).send({
      message: "Password is updated",
    });
  } catch (error) {
    return res.status(500).send({
      message: "Failed to reset password",
      error: error.message,
    });
  }
}

async function forgotPassword(req, res) {
  const { email } = req.body;

  try {
    const user = await User.findOne({
      where: { email },
      attributes: ["id", "email", "fullname"],
    });

    if (!user) return res.status(401).send({ message: "Email is invalid" });

    const resetToken = resetPasswordToken(user);

    const passwordResetURL = `${process.env.CLIENT_URL}/reset/${resetToken}`;

    const message = createEmailTemplate({ user, passwordResetURL });
    await sendEmail({
      email: user.email,
      subject: "Password Recovery",
      message,
    });

    res.status(201).send({
      message: `Password Recovery Link has been sent to ${user.email}`,
    });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
}

module.exports = {
  userSignIn,
  userSignOut,
  userAuthRefresh,
  userAuthCheck,
  resetPassword,
  forgotPassword,

  // new
  sendOtpSignUp,
  verifyOtpSignUp,
  userSignUp,
};
