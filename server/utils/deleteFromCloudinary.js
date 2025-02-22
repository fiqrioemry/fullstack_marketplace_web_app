const cloudinary = require('../config/cloudinary');

module.exports = async function deleteMediaFromCloudinary(imageUrl) {
  try {
    const publicId = imageUrl.split('/').slice(-1).join('/').split('.').shift();
    //

    console.log('PUBLIC ID:', publicId);
    await cloudinary.uploader.destroy(publicId);
    //
  } catch (error) {
    //
    throw new Error('Failed to delete asset from Cloudinary');
  }
};
