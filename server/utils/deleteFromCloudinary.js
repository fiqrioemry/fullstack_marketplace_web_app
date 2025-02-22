const cloudinary = require('../config/cloudinary');

const deleteFromCloudinary = async (imageUrl) => {
  try {
    const publicId = imageUrl.split('/').slice(-1).join('/').split('.').shift();
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    throw new Error('Failed to delete asset from Cloudinary');
  }
};

module.exports = deleteFromCloudinary;
