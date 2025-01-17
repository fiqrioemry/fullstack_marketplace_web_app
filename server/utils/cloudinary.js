const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  secure: true,
});

async function uploadMediaToCloudinary(filePath) {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      resource_type: "auto",
      transformation: [
        {
          width: 500,
          height: 500,
          crop: "limit",
          format: "webp",
        },
      ],
    });

    return result;
  } catch (error) {
    throw new Error("Error uploading to Cloudinary: " + error.message);
  }
}
const deleteMediaFromCloudinary = async (imageUrl) => {
  try {
    const publicId = imageUrl.split("/").slice(-2).join("/").split(".")[0];
    //
    await cloudinary.uploader.destroy(publicId);
    //
  } catch (error) {
    //
    throw new Error("Failed to delete asset from Cloudinary");
  }
};

module.exports = { uploadMediaToCloudinary, deleteMediaFromCloudinary };
