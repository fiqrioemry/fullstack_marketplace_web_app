const { Op } = require('sequelize');
const { User, Address, sequelize } = require('../../models');
const uploadToCloudinary = require('../../utils/uploadToCloudinary');
const deleteFromCloudinary = require('../../utils/deleteFromCloudinary');

async function getProfile(req, res) {
  const userId = req.user.userId;
  try {
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
      email: user.email,
      balance: user.balance,
      createdAt: user.createdAt,
    };

    return res.status(200).json({ profile });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}

async function updateProfile(req, res) {
  const file = req.file;
  const userId = req.user.userId;
  const transaction = await sequelize.transaction();
  const { fullname, phone, birthday, gender } = req.body;

  try {
    const user = await User.findOne({ where: { id: userId }, transaction });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    let avatar = user.avatar;
    let uploadedImage;

    const isUpdated =
      (phone && user.phone !== phone) ||
      (gender && user.gender !== gender) ||
      (birthday && user.birthday !== birthday) ||
      (fullname && user.fullname !== fullname) ||
      file;

    if (!isUpdated) {
      return res.status(400).json({
        message: 'No changes detected',
      });
    }

    if (file?.buffer) {
      try {
        uploadedImage = await uploadToCloudinary(file.buffer, file.mimetype);

        if (user.avatar) {
          await deleteFromCloudinary(user.avatar);
        }
        avatar = uploadedImage.secure_url;
      } catch (error) {
        await transaction.rollback();
        return res.status(500).json({ message: 'Failed to upload avatar' });
      }
    }

    user.avatar = avatar;
    user.phone = phone || user.phone;
    user.gender = gender || user.gender;
    user.birthday = birthday || user.birthday;
    user.fullname = fullname || user.fullname;

    await user.save({ transaction });

    await transaction.commit();

    return res.status(200).json({
      message: 'Profile updated',
      updatedProfile: user,
    });
  } catch (error) {
    await transaction.rollback();
    return res.status(500).json({
      message: error.message,
    });
  }
}

async function getAddress(req, res) {
  const userId = req.user.userId;
  try {
    const address = await Address.findAll({ where: { userId } });

    if (address.length === 0) {
      return res.status(200).json({
        message: 'No Address is found, Try to add one',
        address: [],
      });
    }

    return res
      .status(200)
      .json({ message: 'Get Address Success', address: address });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}

async function addAddress(req, res) {
  const userId = req.user.userId;
  let { name, phone, address, province, city, zipcode, isMain } = req.body;

  try {
    if (!name || !phone || !address || !province || !city || !zipcode) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Cek jumlah alamat yang dimiliki user
    const addressCount = await Address.count({ where: { userId } });

    // Jika ini adalah alamat pertama, otomatis jadikan main address
    if (addressCount === 0) {
      isMain = true;
    } else if (isMain === true) {
      // Jika ada alamat lain dan isMain true, set semua isMain = false
      await Address.update({ isMain: false }, { where: { userId } });
    }

    // Buat alamat baru dengan status isMain yang sesuai
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
    const currentAddress = await Address.findByPk(addressId);

    if (!currentAddress) {
      return res.status(404).json({ message: 'Address not found' });
    }

    if (currentAddress.userId !== userId) {
      return res.status(403).json({ message: 'Unauthorized access' });
    }

    if (isMain === true) {
      await Address.update(
        { isMain: false },
        { where: { userId, id: { [Op.ne]: addressId } } },
      );
    }

    const [updatedRows] = await Address.update(
      { name, phone, address, province, city, zipcode, isMain },
      { where: { id: addressId } },
    );

    if (updatedRows === 0) {
      return res
        .status(400)
        .json({ message: 'No changes made to the address' });
    }

    const updatedAddress = await Address.findByPk(addressId);

    return res.status(200).json({
      message: 'Address updated',
      updatedAddress,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

async function deleteAddress(req, res) {
  const userId = req.user.userId;
  const addressId = req.params.addressId;
  try {
    const currentAddress = await Address.findByPk(addressId);

    if (!currentAddress || currentAddress.userId !== userId) {
      return res.status(404).json({ message: 'Address not found' });
    }

    await Address.destroy({ where: { id: addressId } });

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
  addAddress,
  getAddress,
  updateAddress,
  updateProfile,
  deleteAddress,
};
