const bcrypt = require("bcrypt");
const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");
const speakeasy = require("speakeasy");
const randomAvatar = require("../../utils/randomAvatar");
const { User, Otp, Store, Reset } = require("../../models");
const resetPasswordToken = require("../../utils/resetPasswordToken");
const createEmailTemplate = require("../../utils/createEmailTemplate");

let otpStore = {};

async function sendOtpSignUp(req, res) {
  const { email } = req.body;
  try {
    // email existance check
    const isExist = await User.findOne({
      where: { email },
    });
    if (isExist)
      return res.status(401).send({ message: "Email is already registered" });

    // Generate OTP secret
    const secret = speakeasy.generateSecret({ length: 20 });
    const otp = speakeasy.totp({
      secret: secret.base32,
      encoding: "base32",
    });

    otpStore[email] = { otp, timeSent: Date.now() };

    await sendOtp(email, otp);
  } catch (error) {
    return res.status(500).send({
      message: "Failed to send OTP",
      error: error.message,
    });
  }
}

async function verifyOtpSignUp(req, res) {
  const { email, otp } = req.body;

  if (otpStore[email]) {
    const { otp: storedOtp, timeSent } = otpStore[email];

    const otpExpiryTime = 5 * 60 * 1000;
    const currentTime = Date.now();

    if (currentTime - timeSent > otpExpiryTime) {
      return res.status(400).send("OTP expired.");
    }

    if (storedOtp === otp) {
      res.send("OTP verified! Please proceed to complete your registration.");
    } else {
      res.status(400).send("Invalid OTP.");
    }
  } else {
    res.status(400).send("No OTP sent to this email.");
  }
}

async function userSignUp(req, res) {
  const { fullname, email, password } = req.body;
  try {
    // password match check
    if (!password && !fullname && !email)
      return res.status(500).send({ message: "All field required" });

    // email existance check
    const isExist = await User.findOne({
      where: { email },
    });
    if (isExist)
      return res.status(401).send({ message: "Email is already used" });

    const salt = await bcrypt.genSalt();
    const HashPassword = await bcrypt.hash(password, salt);
    const user = await User.create({
      fullname,
      email,
      password: HashPassword,
      avatar: randomAvatar(),
    });

    res.status(201).send({ data: user, message: "Sign up is success" });
  } catch (error) {
    return res.status(500).send({
      message: "Failed to create new account",
      error: error.message,
    });
  }
}

async function userSignIn(req, res) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      where: { email },
      attributes: ["email", "password"],
    });

    // email existance check
    if (!user)
      return res.status(401).json({ message: "Email is not registered" });

    // password match checking
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Password is Wrong" });

    // Generate OTP secret
    const secret = speakeasy.generateSecret({ length: 20 });
    const otp = speakeasy.totp({
      secret: secret.base32,
      encoding: "base32",
    });

    // Save OTP to database
    await Otp.create({
      userId: user.id,
      code: secret.base32,
      expiresAt: Date.now() + 120 * 1000,
    });

    // Send OTP to user's email
    await sendOtp(user.email, otp);
    return res
      .status(200)
      .send({ message: "Check email for OTP code", data: user.email });
  } catch (error) {
    return res.status(500).send({
      message: "Failed to sign in",
      error: error.message,
    });
  }
}

async function verifyOtp(req, res) {
  try {
    const { email, code } = req.body;

    // Validasi input
    if (!email || !code) {
      return res
        .status(400)
        .send({ message: "Email and OTP code are required" });
    }

    // Query paralel
    const [user, otp] = await Promise.all([
      User.findOne({
        where: { email },
        attributes: [
          "id",
          "fullname",
          "email",
          "role",
          "phone",
          "birthday",
          "gender",
          "avatar",
        ],
        include: [
          {
            model: Store,
            as: "store",
            attributes: ["id", "name", "avatar", "image", "city"],
          },
        ],
      }),
      Otp.findOne({
        where: { email, expiresAt: { [Op.gte]: new Date() } },
      }),
    ]);

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    if (!otp) {
      return res
        .status(400)
        .send({ message: "OTP code is invalid or expired" });
    }

    // Verifikasi OTP
    const isTokenValid = speakeasy.otp.verify({
      secret: otp.code,
      encoding: "base32",
      token: code,
      window: 3,
    });

    if (!isTokenValid) {
      return res.status(401).json({ message: "Invalid OTP" });
    }

    // Hapus OTP
    await Otp.destroy({ where: { userId: user.id } });

    // Buat token
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

    // Kirim response
    return res.status(200).send({
      message: "Login is Successful",
      data: {
        accessToken,
        payload: {
          userId: user.id,
          fullname: user.fullname,
          email: user.email,
          role: user.role,
          storeId: user.store?.id,
          storeName: user.store?.name,
          storeAvatar: user.store?.avatar,
          avatar: user.avatar,
        },
      },
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
    const user = await User.findByPk(userId, {
      attributes: ["id", "email", "fullname", "avatar"],
    });

    if (!user)
      return res
        .status(401)
        .send({ success: false, message: "Unauthorized Access !!!" });

    const payload = {
      userId: user.id,
      email: user.email,
      fullname: user.fullname,
      avatar: user.avatar,
    };

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

    const user = await User.findByPk(userId);

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
  verifyOtp,
  userSignUp,
  userSignOut,
  userAuthRefresh,
  userAuthCheck,
  resetPassword,
  forgotPassword,
};
