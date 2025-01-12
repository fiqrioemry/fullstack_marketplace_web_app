const { Op } = require("sequelize");
const { client } = require("../../utils/redis");
const { User, Address } = require("../../models");
const {
  uploadMediaToCloudinary,
  deleteMediaFromCloudinary,
} = require("../../utils/cloudinary");

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
      attributes: ["id", "fullname", "email", "gender", "birthday", "phone"],
    });

    await client.setEx(`user:${user.id}`, 900, JSON.stringify(user));

    return res.status(200).send({
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
  const file = req.file;
  const { userId } = req.user;
  const { fullname, gender, birthday, phone } = req.body;

  try {
    // Ambil data user berdasarkan userId
    const user = await User.findByPk(userId, {
      attributes: ["id", "fullname", "avatar", "gender", "birthday", "phone"],
    });

    let avatar = user.avatar;

    if (file) {
      const updatedAvatar = await uploadMediaToCloudinary(file.path);

      await deleteMediaFromCloudinary(user.avatar);

      avatar = updatedAvatar.secure_url;
    }

    const updatedUser = {
      fullname: fullname || user.fullname,
      gender: gender || user.gender,
      birthday: birthday || user.birthday,
      phone: phone || user.phone,
      avatar: avatar,
    };

    await client.setEx(`user:${userId}`, 900, JSON.stringify(updatedUser));

    return res.status(200).send({
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
    // Cek apakah data alamat ada di cache
    const cachedAddress = await client.get(`address:${userId}`);

    if (cachedAddress) {
      return res.status(200).send({ data: JSON.parse(cachedAddress) });
    }

    // Jika tidak ada, ambil alamat dari database
    const address = await Address.findAll({ where: { userId } });

    if (address.length === 0) {
      return res.status(404).send({
        message: "You don't have an address",
        data: [],
      });
    }

    // Simpan hasil query ke dalam cache, pastikan dikonversi menjadi string
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
    // Validasi input
    if (!name || !phone || !address || !province || !city || !zipcode) {
      return res
        .status(400)
        .send({ message: "All address fields are required" });
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

    const cachedAddress = await client.get(`address:${userId}`);
    if (cachedAddress) {
      const parsedAddress = JSON.parse(cachedAddress);

      const updatedAddresses = parsedAddress.address.map((addr) => ({
        ...addr,
        isMain: false,
      }));

      if (isMain) {
        updatedAddresses.forEach((addr) => {
          addr.isMain = false;
        });
      }

      updatedAddresses.push(newAddress);
      parsedUser.address = updatedAddresses;

      await client.setEx(`address:${userId}`, 900, JSON.stringify(parsedUser));
    }

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

    const cachedUser = await client.get(`user:${userId}`);
    if (cachedUser) {
      const parsedUser = JSON.parse(cachedUser);
      const updatedAddresses = parsedUser.address.map((addr) =>
        addr.id === addressId
          ? { ...addr, name, phone, address, province, city, zipcode, isMain }
          : isMain
          ? { ...addr, isMain: false }
          : addr
      );

      parsedUser.address = updatedAddresses;
      await client.setEx(`user:${userId}`, 900, JSON.stringify(parsedUser));
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
  updateAddress,
  deleteAddress,
  addAddress,
};
