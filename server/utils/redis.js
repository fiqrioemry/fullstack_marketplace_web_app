const { createClient } = require("redis");
const dotenv = require("dotenv");
dotenv.config();

const { REDIS_CLIENT_PASSWORD, REDIS_CLIENT_URL } = process.env;

const client = createClient({
  username: "default",
  password: REDIS_CLIENT_PASSWORD,
  socket: {
    host: REDIS_CLIENT_URL,
    port: 13751,
  },
});

client.on("error", (err) => console.log("Redis Client Error", err));

// Pastikan Redis terhubung
const connectRedis = async () => {
  try {
    await client.connect();
    console.log("Connected to Redis");
  } catch (err) {
    console.error("Error connecting to Redis", err);
  }
};

module.exports = { client, connectRedis };
