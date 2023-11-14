const express = require("express");
const router = express.Router();
const multer = require("multer");
const ProductModel = require("../models/Product-Model");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: 'desvgqarv',
  api_key: '145346287342629',
  api_secret: 'QKV7NMERDvVo5V9IOr1A0sR51yg',
});

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
});

router.post("/upload", upload.array("images"), async (req, res) => {
  try {
    const { title, prize} = req.body;
    const uploadPromises = req.files.map(async (file) => {
      const result = await cloudinary.uploader.upload(file.buffer, {
        folder: "rooms",
      });
      return result.secure_url;
    });

    const imageUrls = await Promise.all(uploadPromises);

    const uploadToDatabase = await ProductModel.create({
      title,
      prize,
   
      imageUrl: imageUrls,
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
