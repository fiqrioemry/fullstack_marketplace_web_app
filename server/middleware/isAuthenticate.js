const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

module.exports = async function isAuthenticate(req, res, next) {
  const authHeader = req.headers.authorization;
  console.log("isAuthenticate :::", authHeader);

  try {
    if (!authHeader || !authHeader.startsWith("Bearer "))
      return res.status(401).send({ message: "Unauthorized !!! Please Login" });

    const token = authHeader.split(" ").pop();

    jwt.verify(token, process.env.ACCESS_TOKEN, (err, decode) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          return res
            .status(401)
            .json({ error: "Unauthorized !!! Sessions Expired" });
        } else {
          return res.sendStatus(403);
        }
      }

      req.user = decode;

      next();
    });
  } catch (error) {
    console.log(error.message);
  }
};
