const bcrypt = require("bcrypt");
const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");
const speakeasy = require("speakeasy");
const sendOtp = require("../../utils/sendOtp");
const { client } = require("../../utils/redis");
const { User, Store } = require("../../models");
const createSlug = require("../../utils/createSlug");
const randomAvatar = require("../../utils/randomAvatar");

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
      return res.status(401).json({ message: "All Field required" });
    }

    const user = await User.findOne({
      where: { email },
      attributes: { exclude: ["password"] },
      include: [
        { model: Store, as: "store", attributes: ["id", "name", "avatar"] },
      ],
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

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

    const accessToken = jwt.sign(
      { userId: user.id, storeId: user.store?.id },
      process.env.ACCESS_TOKEN,
      {
        expiresIn: "1d",
      }
    );

    const refreshToken = jwt.sign(
      { userId: user.id, storeId: user.store?.id },
      process.env.REFRESH_TOKEN,
      {
        expiresIn: "7d",
      }
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      secure: process.env.NODE_ENV === "production",
    });

    return res.status(200).json({
      message: "Login is success",
      accessToken,
      payload,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
}

async function userSignOut(req, res) {
  const { userId } = req.user;

  delete req.headers.authorization;

  res.clearCookie("refreshToken");

  // await client.del(`user:${userId}`);

  return res.status(200).json({ message: "Logout is success" });
}

async function userAuthCheck(req, res) {
  const userId = req.user.userId;

  try {
    // const cachedUser = await client.get(`user:${userId}`);

    // if (cachedUser) {
    //   return res.status(200).send({ data: JSON.parse(cachedUser) });
    // }

    const user = await User.findByPk(userId, {
      attributes: { exclude: ["password"] },
      include: [
        { model: Store, as: "store", attributes: ["id", "name", "avatar"] },
      ],
    });

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

    // await client.setEx(`user:${userId}`, 900, JSON.stringify(payload));

    res.status(200).json({ payload });
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
        message: "Unauthorized !!! Please Login",
      });
    }

    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN);

    if (!decoded) {
      return res.status(401).send({
        message: "Unauthorized !!! Session Expired",
      });
    }

    const user = await User.findByPk(decoded.userId, {
      attributes: ["id"],
      include: [{ model: Store, as: "store", attributes: ["id"] }],
    });

    if (!user) {
      return res.status(401).send({
        message: "Unauthorized !!! User not found",
      });
    }

    const accessToken = jwt.sign(
      { userId: user.id, storeId: user.store?.id },
      process.env.ACCESS_TOKEN,
      { expiresIn: "15m" }
    );

    res.status(200).send({
      accessToken,
    });
  } catch (error) {
    return res.status(500).send({
      message: "Failed to refresh token",
      error: error.message,
    });
  }
}

async function resetPassword(req, res) {}

async function forgotPassword(req, res) {}

async function userOpenStore(req, res) {
  const { userId } = req.user;

  const { name, description, city } = req.body;

  try {
    const slug = createSlug(name);

    if (!name || !description || !city)
      return res
        .status(400)
        .send({ success: false, message: "All fields required" });

    const existingStore = await Store.findOne({
      where: {
        [Op.or]: [{ userId }, { slug }],
      },
    });

    if (existingStore) {
      if (existingStore.userId === userId) {
        return res.status(400).json({
          message: "You already have a store.",
        });
      }

      if (existingStore.slug === slug) {
        return res.status(400).json({
          message: "Store name already exists.",
        });
      }
    }

    const user = await User.findByPk(userId, {
      attributes: { exclude: ["password"] },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const store = await Store.create({
      userId,
      name,
      slug,
      city,
      description,
      avatar: randomAvatar(),
    });

    await user.update({ role: "seller" });

    const payload = {
      userId: user.id,
      email: user.email,
      fullname: user.fullname,
      avatar: user.avatar,
      birthday: user.birthday,
      phone: user.phone,
      gender: user.gender,
      role: user.role,
      storeId: store.id,
      storeName: store.name,
      storeAvatar: store.avatar,
    };

    // await client.setEx(`user:${userId}`, 900, JSON.stringify(payload));

    res.status(201).json({
      message: "Store is created",
      payload,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to create new store", error: error.message });
  }
}

module.exports = {
  userSignIn,
  userSignUp,
  userSignOut,
  userAuthCheck,
  resetPassword,
  userOpenStore,
  sendOtpSignUp,
  forgotPassword,
  userAuthRefresh,
  verifyOtpSignUp,
};
