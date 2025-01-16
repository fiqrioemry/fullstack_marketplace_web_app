const {
  uploadMediaToCloudinary,
  deleteMediaFromCloudinary,
} = require("../../utils/cloudinary");
const { Op } = require("sequelize");
const { client } = require("../../utils/redis");
const { User, Store, Address } = require("../../models");
const { removeUploadFile } = require("../../utils/removeUploadFile");

async function getProfile(req, res) {
  const { userId } = req.user;

  try {
    const cachedUser = await client.get(`user:${userId}`);

    if (cachedUser) {
      return res.status(200).send({
        data: JSON.parse(cachedUser),
      });
    }

    const user = await User.findByPk(userId, {
      attributes: { exclude: ["password"] },
      include: [
        { model: Store, as: "store", attributes: ["id", "name", "avatar"] },
      ],
    });

    const payload = {
      userId: user.id,
      email: user.email,
      fullname: user.fullname,
      avatar: user.avatar,
      birthday: user.birthday,
      phone: user.phone,
      gender: user.gender,
      role: user.role,
      storeId: user.store?.id,
      storeName: user.store?.name,
      storeAvatar: user.store?.avatar,
    };

    await client.setEx(`user:${user.id}`, 900, JSON.stringify(payload));

    return res.status(200).send({
      data: payload,
    });
  } catch (error) {
    return res.status(500).send({
      message: "Failed to Retrieve Profile",
      error: error.message,
    });
  }
}

async function updateProfile(req, res) {
  const file = req.file;
  const { userId } = req.user;
  const { fullname, gender, birthday, phone } = req.body;

  try {
    const user = await User.findByPk(userId, {
      attributes: { exclude: ["password"] },
      include: [
        { model: Store, as: "store", attributes: ["id", "name", "avatar"] },
      ],
    });

    if (!user) {
      if (file) {
        await fs.unlink(file.path);
      }
      return res.status(404).json({ message: "User not found" });
    }

    let avatar = user.avatar;

    if (file) {
      const updatedAvatar = await uploadMediaToCloudinary(file.path);

      if (user.avatar) {
        await deleteMediaFromCloudinary(user.avatar);
      }

      avatar = updatedAvatar.secure_url;

      await removeUploadFile(file.path);
    }

    const updatedUser = {
      fullname: fullname || user.fullname,
      gender: gender || user.gender,
      birthday: birthday || user.birthday,
      phone: phone || user.phone,
      avatar: avatar,
      role: user.role,
      storeId: user.store?.id,
      storeName: user.store?.name,
      storeAvatar: user.store?.avatar,
    };

    await user.update(updatedUser);

    await client.setEx(`user:${userId}`, 900, JSON.stringify(updatedUser));

    return res.status(200).json({
      message: "Profile is updated",
      data: updatedUser,
    });
  } catch (error) {
    return res.status(500).send({
      message: "Failed to Update Profile",
      error: error.message,
    });
  }
}

async function getAddress(req, res) {
  const { userId } = req.user;

  try {
    const cachedAddress = await client.get(`address:${userId}`);

    if (cachedAddress) {
      return res.status(200).send({ data: JSON.parse(cachedAddress) });
    }

    const address = await Address.findAll({ where: { userId } });

    if (address.length === 0) {
      return res.status(200).send({
        message: "No Address is found, Try to add one",
        data: [],
      });
    }

    await client.setEx(`address:${userId}`, 900, JSON.stringify(address));

    return res.status(200).send({
      data: address,
    });
  } catch (error) {
    return res.status(500).send({
      message: "Failed to Retrieve address",
      error: error.message,
    });
  }
}

async function addAddress(req, res) {
  const { userId } = req.user;
  const { name, phone, address, province, city, zipcode, isMain } = req.body;

  try {
    if (!name || !phone || !address || !province || !city || !zipcode) {
      return res.status(400).send({ message: "All fields are required" });
    }

    if (isMain === true) {
      await Address.update({ isMain: false }, { where: { userId } });
    }

    const newAddress = await Address.create({
      userId,
      name,
      phone,
      address,
      province,
      city,
      zipcode,
      isMain,
    });

    const updatedAddresses = await Address.findAll({ where: { userId } });

    await client.setEx(
      `address:${userId}`,
      900,
      JSON.stringify(updatedAddresses)
    );

    return res.status(201).send({
      message: "New Address is added",
      data: newAddress,
    });
  } catch (error) {
    return res.status(500).send({
      message: "Failed to Add New Address",
      error: error.message,
    });
  }
}

async function updateAddress(req, res) {
  const { addressId } = req.params;
  const { name, phone, address, province, city, zipcode, isMain } = req.body;
  const { userId } = req.user;

  try {
    const currentAddress = await Address.findByPk(addressId);

    if (!currentAddress || currentAddress.userId !== userId) {
      return res.status(404).send({ message: "Address not found" });
    }

    if (isMain === true) {
      await Address.update(
        { isMain: false },
        { where: { userId, id: { [Op.ne]: addressId } } }
      );
    }

    const [updatedRows] = await Address.update(
      { name, phone, address, province, city, zipcode, isMain },
      { where: { id: addressId } }
    );

    if (updatedRows === 0) {
      return res
        .status(404)
        .send({ message: "Address not found or no changes made" });
    }

    const updatedAddress = await Address.findAll({ where: { userId } });

    await client.setEx(
      `address:${userId}`,
      900,
      JSON.stringify(updatedAddress)
    );

    return res.status(200).send({
      message: "Address is Updated",
      data: updatedAddress,
    });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Failed to Update Address", error: error.message });
  }
}

async function deleteAddress(req, res) {
  const { addressId } = req.params;
  const { userId } = req.user;

  try {
    const currentAddress = await Address.findByPk(addressId);

    if (!currentAddress || currentAddress.userId !== userId) {
      return res.status(404).send({ message: "Address not found" });
    }

    await Address.destroy({ where: { id: addressId } });

    const cachedAddress = await client.get(`address:${userId}`);
    if (cachedAddress) {
      let parsedAddress = JSON.parse(cachedAddress);

      parsedAddress = parsedAddress.filter(
        (address) => address.id !== addressId
      );

      await client.setEx(
        `address:${userId}`,
        900,
        JSON.stringify(parsedAddress)
      );
    }

    return res.status(200).send({
      message: "Address deleted successfully",
    });
  } catch (error) {
    return res.status(500).send({
      message: "Failed to Delete Address",
      error: error.message,
    });
  }
}

module.exports = {
  getProfile,
  updateProfile,
  updateAddress,
  deleteAddress,
  addAddress,
  getAddress,
};
