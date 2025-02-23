require('dotenv').config();
const Redis = require('ioredis');

const { REDIS_PORT, DB_HOST } = process.env;

const redis = new Redis({
  host: DB_HOST,
  port: REDIS_PORT,
});

const connectRedis = async () => {
  try {
    await redis.ping();
    console.log('Redis is connected on port', REDIS_PORT);
  } catch (error) {
    console.error('Error connecting to Redis', error);
    process.exit(1);
  }
};

module.exports = { connectRedis, redis };
