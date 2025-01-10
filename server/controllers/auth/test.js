const { User } = require("../../models");

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
