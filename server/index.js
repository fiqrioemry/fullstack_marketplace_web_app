require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const passport = require("passport");
const session = require("cookie-session");
const cookies = require("cookie-parser");
const services = require("./routes");

const { PORT, CLIENT_URL, SESSION_SECRET } = process.env;

// Setup cookie session
app.use(
  session({
    name: "session",
    keys: [process.env.SESSION_SECRET],
    maxAge: 24 * 60 * 60 * 1000,
  })
);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

app.use(cookies());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: CLIENT_URL, credentials: true }));

// route
app.use("/api/auth", services.authRoute);
// app.use("/api/user", services.userRoute);
// app.use("/api/product", services.productRoute);
// app.use("/api/category", services.categoryRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
