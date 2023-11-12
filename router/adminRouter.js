const express = require("express");
const router = express.Router();
const multer = require("multer");
const ProductModel = require("../models/Product-Model");
const cloudinary = require("cloudinary").v2;

const upload = multer({ dest: "upload/" });

cloudinary.config({
  cloud_name: 'desvgqarv',
  api_key: '145346287342629',
  api_secret: 'QKV7NMERDvVo5V9IOr1A0sR51yg',
});

router.post("/upload", upload.array("images"), async (req, res) => {
  try {
    const { title, prize, location } = req.query;
    const [imageOne, imageTwo, imageThree] = req.files;

    const uploadImageOne = await cloudinary.uploader.upload(imageOne.path, {
      folder: "rooms",
    });

    const uploadImageTwo = await cloudinary.uploader.upload(imageTwo.path, {
      folder: "rooms",
    });

    const uploadImageThree = await cloudinary.uploader.upload(imageThree.path, {
      folder: "rooms",
    });

    const uploadToDatabase = await ProductModel.create({
      title,
      prize,
      location,
      imageUrl: [uploadImageTwo, uploadImageOne, uploadImageThree],
    });

    res.status(200).json({
      message: "Successfully Uploaded",
    });
  } catch (error) {
    console.error("Error in upload route:", error);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
});

module.exports = router;
