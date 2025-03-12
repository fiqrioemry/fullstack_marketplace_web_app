require('dotenv').config();
require('./config/passport');
const express = require('express');
const app = express();
const cors = require('cors');
const services = require('./routes');
const cookieParser = require('cookie-parser');
const limiter = require('./middleware/limiter');
const { connectRedis } = require('./config/redis');

const { PORT, CLIENT_URL } = process.env;

// app.use(limiter);
app.use(cookieParser());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(
  cors({
    origin: CLIENT_URL,
    credentials: true,
    methods: ['POST', 'PUT', 'GET', 'DELETE'],
  }),
);

(async () => {
  await connectRedis();

  app.use('/api/auth', services.authRoute);
  app.use('/api/user', services.userRoute);
  app.use('/api/cart', services.cartRoute);
  app.use('/api/store', services.storeRoute);
  app.use('/api/product', services.productRoute);
  app.use('/api/category', services.categoryRoute);
  app.use('/api/seller', services.sellerRoute);
  app.use('/api/customer', services.customerRoute);
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
})();
