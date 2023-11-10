const express = require("express")
const router = express.Router()
const multer = require("multer")
const ProductModel = require("../models/Product-Model")
const cloudinary = require("cloudinary").v2
const upload = multer({dest:"upload/"})
cloudinary.config({
    cloud_name: 'desvgqarv',
    api_key: '145346287342629',
    api_secret: 'QKV7NMERDvVo5V9IOr1A0sR51yg',
})

router.get("/upload",upload.array("images"),async(req,res)=>{
    try {
        
    const {title , prize , location } = req.body
    const imageOne = req.files[0];
    const imageTwo = req.files[1];
    const imageThree = req.files[2];

    const uploadImageOne = await cloudinary.uploader.upload(imageOne.path,{
        folder:"rooms"
    })

    const uploadImagTwo = await cloudinary.uploader.upload(imageTwo.path,{
        folder:"rooms"
    })

    const uploadImageThree = await cloudinary.uploader.upload(imageThree.path,{
        folder:"rooms"
    })

    const uploadToDatabase = await ProductModel.create({
        title,
        prize,
        location,
        imageUrl: [uploadImagTwo,uploadImageOne,uploadImageThree]
    })

    res.status(200).json({
        message:"you SuccessFully Uploaded "
    })
        
    } catch (error) {
        res.status(401).json({
            message: `error: {
                ${error}
            }`
        })
    }
})

module.exports = router