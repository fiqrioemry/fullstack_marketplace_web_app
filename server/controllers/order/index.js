const { client } = require("../../utils/redis");
const { User, Order, OrderDetail } = require("../../models");

async function getProfile(req, res) {
  const { userId } = req.user;
    const {address, cartIds, shipmentCosts} = req.body
  try {
    const {}


    return res.status(200).send({
      data: payload,
    });
  } catch (error) {
    return res.status(500).send({
      message: "Failed to Create New Order",
      error: error.message,
    });
  }
}
