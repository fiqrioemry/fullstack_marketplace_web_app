const bcrypt = require("bcrypt");
const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");
const randomAvatar = require("../../utils/randomAvatar");
const { User, Profile, Otp, Store, Reset } = require("../../models");
const resetPasswordToken = require("../../utils/resetPasswordToken");

async function userSignUp(req, res) {
  const { fullname, email, password, passwordConfirm } = req.body;
  try {
    // password match check
    if (password !== passwordConfirm)
      return res.status(500).send({ message: "Password tidak sesuai" });

    // email existance check
    const isExist = await User.findOne({
      where: { email },
    });
    if (isExist)
      return res.status(401).send({ message: "Email is Registered" });

    // Password Encryption
    const salt = await bcrypt.genSalt();
    const HashPassword = await bcrypt.hash(password, salt);
    const user = await User.create({
      fullname,
      email,
      password: HashPassword,
    });
    await Profile.create({
      userId: user.id,
      avatar: randomAvatar(),
    });

    res.status(201).send({ message: "Sign up is success" });
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
      attributes: ["id", "fullname", "email", "password"],
      include: [
        {
          model: Profile,
          attributes: ["gender", "phone", "avatar", "birthday"],
        },
        { model: Store, attributes: ["id", "name", "city"] },
      ],
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
      message: "Failed to create new account",
      error: error.message,
    });
  }
}

async function verifyOtp(req, res) {
  try {
    const { email, code } = req.body;

    const user = await User.findOne({
      where: { email },
      attributes: ["id", "fullname", "email", "role"],
      include: [
        {
          model: Profile,
          attributes: ["phone", "birthday", "gender", "avatar"],
        },
        { model: Store, attributes: ["id", "name", "city"] },
      ],
    });

    const otp = await Otp.findOne({
      where: { userId: user.id, expiresAt: { [Op.gte]: new Date() } },
    });

    if (!otp) {
      return res.status(400).send({ message: "OTP code is expired" });
    }

    // Verify OTP token
    const isTokenValid = speakeasy.totp.verify({
      secret: otp.code,
      encoding: "base32",
      token: code,
      window: 3,
    });

    if (!isTokenValid) {
      return res.status(401).json({ message: "Invalid OTP" });
    }

    await Otp.destroy({ where: { userId: user.id } });

    const payload = {
      userId: user.id,
      fullname: user.fullname,
      email: user.email,
      role: user.role,
      storeId: user.Store?.id,
      storeName: user.Store?.name,
      avatar: user.Profile.avatar,
    };

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
      secure: process.env.ENVIRONTMENT === "production",
    });

    return res.status(200).send({
      message: "Login is Success",
      data: {
        accessToken,
        payload,
      },
    });
  } catch (error) {
    return res.status(500).send(error.message);
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
    const user = await User.findByPk(userId, { include: [{ model: Profile }] });

    if (!user)
      return res
        .status(401)
        .send({ success: false, message: "Unauthorized Access !!!" });

    const payload = {
      userId: user.id,
      email: user.email,
      fullname: user.fullname,
      avatar: user.Profile.avatar,
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
      { expiresIn: "30m" }
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
    // check reset token
    const user = await Reset.findOne({
      where: { token, ExpiresAt: { [Op.gte]: new Date() } },
    });
    if (!user)
      return res.status(400).send({
        message: "Reset Password Token is invalid or has been expired",
      });

    const { newPassword, newPasswordConfirm } = req.body;
    // check password match
    if (newPassword !== newPasswordConfirm) {
      return res
        .status(400)
        .send({ message: "Password confirmation did not match" });
    }
    // create new password encryption
    const newHashPassword = await bcrypt.hash(newPassword, 10);

    // update new password to database table and destroy reset token
    (await User.update(
      { password: newHashPassword },
      { where: { id: user.userId } }
    )) && Reset.destroy({ where: { userId: user.userId } });

    res.status(200).send({
      success: true,
      message: `Your password has been succesfully updated`,
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
    });

    if (!user) return res.status(401).send({ message: `Email not valid` });
    // Get ResetPassword Token
    const resetToken = resetPasswordToken(user);

    // Generate Link for password reset
    const passwordResetURL = `${process.env.BASE_URL}/reset-password/${resetToken}`;

    // generate message for Email content
    const message = getTemplate({ user, passwordResetURL });
    await sendEmail({
      email: user.email,
      subject: `Ecommerce Password Recovery`,
      message,
    });

    res.status(200).send({
      success: true,
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
