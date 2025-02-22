const {
  uploadMediaToCloudinary,
  deleteMediaFromCloudinary,
} = require('../../utils/cloudinary');
const { Op } = require('sequelize');
const fs = require('fs').promises;
const { client } = require('../../utils/redis');
const { User, Address } = require('../../models');

async function getProfile(req, res) {
  const { userId } = req.user;

  try {
    const cachedUser = await client.get(`profile:${userId}`);

    if (cachedUser) {
      return res.status(200).json({
        payload: JSON.parse(cachedUser),
      });
    }

    const user = await User.findByPk(userId, {
      attributes: { exclude: ['password'] },
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const profile = {
      phone: user.phone,
      avatar: user.avatar,
      gender: user.gender,
      fullname: user.fullname,
      birthday: user.birthday,
    };

    await client.setEx(`profile:${userId}`, 900, JSON.stringify(profile));

    return res.status(200).json(profile);
  } catch (error) {
    return res.status(500).json({
      message: 'Failed to Retrieve Profile',
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
      attributes: { exclude: ['password'] },
    });

    if (!user) {
      if (file) {
        await fs.unlink(file.path);
      }
      return res.status(404).json({ message: 'User not found' });
    }

    let avatar = user.avatar;

    if (file) {
      const updatedAvatar = await uploadMediaToCloudinary(file.path);

      if (user.avatar) {
        await deleteMediaFromCloudinary(user.avatar);
      }

      avatar = updatedAvatar.secure_url;

      await fs.unlink(file.path);
    }

    // Update data pengguna
    const updatedProfile = {
      fullname: fullname || user.fullname,
      avatar: avatar,
      birthday: birthday || user.birthday,
      phone: phone || user.phone,
      gender: gender || user.gender,
    };

    await user.update(updatedUser);

    await client.setEx(`profile:${userId}`, 900, JSON.stringify(updatedUser));

    return res.status(200).json({
      message: 'Profile is updated',
      updatedProfile,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Failed to Update Profile',
      error: error.message,
    });
  }
}

async function getAddress(req, res) {
  const userId = req.user.userId;

  try {
    const cachedAddress = await client.get(`address:${userId}`);

    if (cachedAddress) {
      return res.status(200).json({ payload: JSON.parse(cachedAddress) });
    }

    const address = await Address.findAll({ where: { userId } });

    if (address.length === 0) {
      return res.status(200).json({
        message: 'No Address is found, Try to add one',
        address: [],
      });
    }

    await client.setEx(`address:${userId}`, 900, JSON.stringify(address));

    return res.status(200).json(address);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}

async function addAddress(req, res) {
  const userId = req.user.userId;
  const { name, phone, address, district, province, city, zipcode, isMain } =
    req.body;

  try {
    if (
      !name ||
      !phone ||
      !address ||
      !province ||
      !city ||
      !zipcode ||
      !district
    ) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (isMain === true) {
      await Address.update({ isMain: false }, { where: { userId } });
    }

    const newAddress = {
      userId,
      name,
      phone,
      address,
      province,
      city,
      district,
      zipcode,
      isMain,
    };
    await Address.create(newAddress);

    await client.del(`address:${userId}`);

    return res.status(201).json({
      message: 'New Address is added',
      newAddress,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}

async function updateAddress(req, res) {
  const userId = req.user.userId;
  const addressId = req.params.addressId;
  const { name, phone, address, province, city, zipcode, isMain } = req.body;

  try {
    // Cek apakah address ada dan milik user yang benar
    const currentAddress = await Address.findByPk(addressId);

    if (!currentAddress) {
      return res.status(404).json({ message: 'Address not found' });
    }

    if (currentAddress.userId !== userId) {
      return res.status(403).json({ message: 'Unauthorized access' });
    }

    // Jika address ini dijadikan utama (isMain: true), reset isMain address lain
    if (isMain === true) {
      await Address.update(
        { isMain: false },
        { where: { userId, id: { [Op.ne]: addressId } } },
      );
    }

    // Update address berdasarkan input user
    const [updatedRows] = await Address.update(
      { name, phone, address, province, city, zipcode, isMain },
      { where: { id: addressId } },
    );

    if (updatedRows === 0) {
      return res
        .status(400)
        .json({ message: 'No changes made to the address' });
    }

    // Ambil data terbaru setelah update
    const updatedAddress = await Address.findByPk(addressId);

    return res.status(200).json({
      message: 'Address updated successfully',
      updatedAddress,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

async function deleteAddress(req, res) {
  const { userId } = req.user;
  const { addressId } = req.params;
  try {
    const currentAddress = await Address.findByPk(addressId);

    if (!currentAddress || currentAddress.userId !== userId) {
      return res.status(404).json({ message: 'Address not found' });
    }

    await Address.destroy({ where: { id: addressId } });

    // Hapus cache Redis untuk alamat pengguna
    await client.del(`address:${userId}`);

    return res.status(200).json({
      message: 'Address is deleted',
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Failed to Delete Address',
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
