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
    origin: CLIENT_URL,
    credentials: true,
    methods: ["POST", "PUT", "GET", "DELETE"],
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
