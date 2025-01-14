require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const services = require("./routes");
const cookies = require("cookie-parser");
const { connectRedis } = require("./utils/redis");

const { PORT, CLIENT_URL } = process.env;

app.use(cookies());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: CLIENT_URL, // Batasi origin yang diizinkan untuk mengakses API (misalnya, hanya domain frontend yang dipercaya)
    credentials: true, // Memungkinkan cookies, HTTP authentication, dan client-side SSL certificates dalam permintaan
    methods: ["POST", "PUT", "GET", "DELETE"], // Batasi metode HTTP yang diperbolehkan. Misalnya, hanya menerima POST, PUT, GET, dan DELETE
    allowedHeaders: [
      "Content-Type", // Mengizinkan header Content-Type, yang sering digunakan untuk menentukan jenis data yang dikirim dalam request
      "Authorization", // Mengizinkan header Authorization untuk mengirimkan token atau kredensial autentikasi dalam permintaan
      "Content-Length", // Mengizinkan header Content-Length, yang menunjukkan ukuran body dalam request
      "multipart/form-data", // Mengizinkan header multipart/form-data, yang diperlukan untuk mengupload file (misalnya gambar)
    ],
  })
);
connectRedis().then(() => {
  app.use("/api/auth", services.authRoute);
  app.use("/api/user", services.userRoute);
  // app.use("/api/product", services.productRoute);
  // app.use("/api/category", services.categoryRoute);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
