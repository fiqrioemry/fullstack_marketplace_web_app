require("dotenv").config();
const jwt = require("jsonwebtoken");
const { User } = require("../../models");
const { OAuth2Client } = require("google-auth-library");

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

async function googleSignIn(req, res) {
  try {
    const { tokenId } = req.body;

    // Verifikasi idToken yang diterima dari Google
    const ticket = await client.verifyIdToken({
      idToken: tokenId, // Pastikan yang dikirim adalah tokenId, bukan tokenId yang salah
      audience: process.env.GOOGLE_CLIENT_ID, // Verifikasi token dengan clientID
    });

    // Ambil payload dari token yang terverifikasi
    const payload = ticket.getPayload();
    const { email, sub: googleId, name: fullname } = payload;

    // Cari user berdasarkan email
    let user = await User.findOne({ where: { email } });

    if (!user) {
      // Jika user tidak ditemukan, buat akun baru
      user = await User.create({
        email,
        googleId,
        fullname,
      });
      return res
        .status(201)
        .send({ message: "User registered with Google", user });
    }

    // Jika user sudah ada dan belum ada googleId, simpan googleId
    if (!user.googleId) {
      user.googleId = googleId;
      await user.save();
    }

    // Generate access token dan refresh token
    const accessToken = jwt.sign(
      { userId: user.id },
      process.env.ACCESS_TOKEN, // Gunakan secret untuk access token
      {
        expiresIn: "1d", // Kedaluwarsa token akses 1 hari
      }
    );

    const refreshToken = jwt.sign(
      { userId: user.id },
      process.env.REFRESH_TOKEN, // Gunakan secret untuk refresh token
      {
        expiresIn: "7d", // Kedaluwarsa refresh token 7 hari
      }
    );

    // Simpan refresh token di HTTP-only cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, // Refresh token berlaku selama 7 hari
      secure: process.env.NODE_ENV === "production", // Hanya untuk lingkungan produksi
    });

    // Kirim response dengan data user dan token
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
      .send({ message: "Server error", error: error.message });
  }
}
async function userSignIn(req, res) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      where: { email },
      attributes: ["email", "password"], // Tambahkan "password" agar bisa dicek
    });

    if (!user) {
      return res.status(200).send({ message: "user_signup" });
    }

    if (password && password.length !== 0) {
      const match = await bcrypt.compare(password, user.password);
      if (!match) return res.status(400).json({ message: "password is wrong" });

      const accessToken = jwt.sign(
        { userId: user.id },
        process.env.ACCESS_TOKEN,
        {
          expiresIn: "3d",
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
    } else {
      if (user.password) {
        return res.status(200).send({ message: "enter_password" });
      } else {
        return res.status(200).send({ message: "reset_password" });
      }
    }
  } catch (error) {
    return res.status(500).send({
      message: "Something went wrong",
      error: error.message,
    });
  }
}

async function userResetPassword(req, res) {
  try {
    const { email } = req.body;

    const user = await User.findOne({
      where: { email },
      attributes: ["email", "password"], // Tambahkan "password" agar bisa dicek
    });

    // Jika user tidak ditemukan
    if (!user) {
      return res.status(200).send({ message: "user_signup" });
    }

    // Jika user ditemukan, cek apakah memiliki password
    if (user.password) {
      return res.status(200).send({ message: "enter_password" });
    } else {
      return res.status(200).send({ message: "reset_password" });
    }
  } catch (error) {
    return res.status(500).send({
      message: "Something went wrong",
      error: error.message,
    });
  }
}
