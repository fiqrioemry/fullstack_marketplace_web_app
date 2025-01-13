module.exports = async function isAdmin(req, res, next) {
  const { role } = req.user;
  try {
    if (role !== "admin")
      return res
        .status(403)
        .send({ message: "Forbidden !!! Access is Prohibited" });
    next();
  } catch (error) {
    console.log(error.message);
  }
};
