module.exports = async function isAdmin(req, res, next) {
  const { role } = req.user;
  try {
    if (role !== "admin")
      return res.status(401).send({ message: "Unauthorized Access" });
    next();
  } catch (error) {
    console.log(error.message);
  }
};
