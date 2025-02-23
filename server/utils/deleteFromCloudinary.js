const cloudinary = require('../config/cloudinary');

const deleteFromCloudinary = async (url) => {
  try {
    const publicId = url.split('/').slice(-1).join('/').split('.').shift();
    await cloudinary.uploader.destroy(
      `${process.env.CLOUD_FOLDER}/${publicId}`,
    );
  } catch (error) {
    throw new Error('Failed to delete asset from Cloudinary');
  }
};

module.exports = deleteFromCloudinary;
