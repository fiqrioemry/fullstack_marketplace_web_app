module.exports = async function isSeller(req, res, next) {
  try {
    if (req.user.role !== 'seller')
      return res
        .status(403)
        .send({ message: 'Forbidden !!! Access is Prohibited' });
    next();
  } catch (error) {
    console.log(error.message);
  }
};
