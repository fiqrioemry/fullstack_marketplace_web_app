const { Op } = require("sequelize");
const { client } = require("../../utils/redis");
const { User, Address } = require("../../models");

async function getProfile(req, res) {
  const { userId } = req.user;

  try {
    const cachedUser = await client.get(`user:${userId}`);

    if (cachedUser) {
      return res.status(200).send({
        message: "Get Profile is Success",
        data: JSON.parse(cachedUser),
      });
    }

    const user = await User.findByPk(userId, {
      attributes: ["id", "fullname", "email", "gender", "birthday", "phone"],
      include: [{ model: Address, as: "address" }],
    });

    await client.setEx(`user:${user.id}`, 900, user);

    return res.status(200).send({
      success: true,
      message: "Get Profile is Success",
      data: user,
    });
  } catch (error) {
    return res.status(500).send({
      message: "Failed to Retrieve Profile",
      error: error.message,
    });
  }
}

async function updateProfile(req, res) {
  const { userId } = req.user;
  const { fullname, gender, birthday, phone } = req.body;

  try {
    if (!fullname || !gender || !birthday || !phone) {
      return res.status(400).send({
        message: "All fields are required",
      });
    }

    const [updatedRows] = await User.update(
      { fullname, gender, birthday, phone },
      { where: { id: userId } }
    );

    if (updatedRows === 0) {
      return res.status(404).send({
        message: "User not found or no changes made",
      });
    }

    const updatedUser = await User.findByPk(userId, {
      attributes: ["id", "fullname", "email", "gender", "birthday", "phone"],
      include: [{ model: Address, as: "address" }],
    });

    await client.setEx(`user:${userId}`, 900, JSON.stringify(updatedUser));

    return res.status(200).send({
      success: true,
      message: "Profile updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    return res.status(500).send({
      message: "Failed to Update Profile",
      error: error.message,
    });
  }
}

async function addAddress(req, res) {
  const { userId } = req.user;
  const { name, phone, address, province, city, zipcode, isMain } = req.body;

  try {
    if (!name || !phone || !address || !province || !city || !zipcode) {
      return res
        .status(400)
        .send({ message: "All address fields are required" });
    }

    if (isMain === true) {
      const address = await Address.findAll({ where: { userId: userId } });

      await address.update({
        isMain: false,
      });
    }

    const newAddress = await Address.create({
      name,
      phone,
      address,
      province,
      city,
      zipcode,
      isMain,
    });

    const cachedUser = await client.get(`user:${userId}`);
    if (cachedUser) {
      const parsedUser = JSON.parse(cachedUser);
      parsedUser.address.push(newAddress);
      await client.setEx(`user:${userId}`, 900, JSON.stringify(parsedUser));
    }

    return res.status(201).send({
      success: true,
      message: "New Address is added",
      data: newAddress,
    });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Failed to Add New Address", error: error.message });
  }
}

async function editAddress(req, res) {
  const { addressId } = req.params;
  const { name, phone, address, province, city, zipcode, isMain } = req.body;

  try {
    const [updatedRows] = await Address.update(
      { name, phone, address, province, city, zipcode },
      { where: { id: addressId } }
    );

    if (updatedRows === 0) {
      return res
        .status(404)
        .send({ message: "Address not found or no changes made" });
    }

    return res.status(200).send({
      success: true,
      message: "Address updated successfully",
    });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Failed to Update Address", error: error.message });
  }
}

async function deleteAddress(req, res) {}

module.exports = {
  getProfile,
  updateProfile,
  editAddress,
  deleteAddress,
  addAddress,
};
