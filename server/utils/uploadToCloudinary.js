const cloudinary = require('../config/cloudinary');

module.exports = async function uploadToCloudinary(filePath) {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      resource_type: 'auto',
      transformation: [
        {
          width: 500,
          height: 500,
          crop: 'limit',
          format: 'webp',
        },
      ],
    });

    return result;
  } catch (error) {
    throw new Error('Error uploading to Cloudinary: ' + error.message);
  }
};
