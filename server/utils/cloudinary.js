const cloudinary = require("cloudinary");
const dotenv = require("dotenv");

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

const cloudinaryUploadImg = async (file) => {
  try {
    const data = await cloudinary.uploader.upload(file, {
      resource_type: "auto",
    });
    //Only need the url to save in our database.
    return {
      url: data?.secure_url,
    };
  } catch (error) {
    return error;
  }
};

module.exports = cloudinaryUploadImg;
