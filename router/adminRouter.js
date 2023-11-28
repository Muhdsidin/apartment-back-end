const express = require("express");
const router = express.Router();
const multer = require("multer");
const ProductModel = require("../models/Product-Model");
const BuildModel = require("../models/Build-Model");
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

router.post("/upload-building", async(req,res)=>{
 try {
  const {
    name,
    zip,
    state,
    address,
    city} = req.body

  console.log(req.body)
  const upload = await BuildModel.create({
    name,
    zip,
    state,
    address,
    city
  })

  console.log(upload)

  res.status(200).json({
    message:"SuccussFully Uploaded"
  })
   res.status(200).json({
     message:"Uploaded"
   })
 } catch (error) {
  console.log(error)
  res.status(404).json({
    message:`error from backend${error}`
  })
 }
})

router.get("/get-building",async(req,res)=>{
  const BuildData = await BuildModel.find()
  if(!BuildData){
    return res.status(402).json({
      message:" sorry there Is No Building "
    })
  }
  console.log(BuildData)
  res.status(200).json(BuildData)
})
 
router.post("/upload",async (req, res) => {
  try {
    const { title, prize,  buildingId } = req.body;

    const uploadToDatabase = await ProductModel.create({
      title,
      prize,
 
    });

    const findByBuild = await BuildModel.findByIdAndUpdate(buildingId,{$push:{natural:uploadToDatabase._id}})
    if(!findByBuild){
      return res.status(402).json({
        message:"sorry this building is not found "
      })
    }


    
    res.status(200).json(findByBuild);
  } catch (error) {
    console.error("Error in upload route:", error);
    res.status(500).json({ 
      message: "Internal Server Error", 
      error: error.message,
    });
  }
});

router.get("/get-room/", async (req, res) => {
  const { buildid } = req.headers;

  try {
    const build = await BuildModel.findOne({ _id: buildid }).populate('natural');
    console.log(build);
    res.status(200).json(build);
  } catch (error) {
    console.error("Error fetching building:", error);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message, 
    });
  }   
});  

router.get("/get-active-room", async (req,res)=>{
  try {
    const {roomid} = req.headers

  const result = await ProductModel.findById(roomid)

  if(!result){
    return res.status(401).json({
      message:"Sorry there is no identity is there"
    })
  }

  res.status(200).json(result)
  } catch (error) {
    console.log(error)
    res.status(402).json({
      message:"Sorry error message from server "
    })
  }
})


module.exports = router;
