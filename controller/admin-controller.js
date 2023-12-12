const BookModel = require("../models/Book-Model");
const BuildModel = require("../models/Build-Model");
const ProductModel = require("../models/Product-Model");

const bookRoom = async (req, res) => {
  try {
    console.log("hello world ");
    const { name, address, state, RoomId, region, country } = req.body;
    console.log(req.body)

    const upload = await BookModel.create({
      name,
      address,
      state,
      roomNo:RoomId,
      region,
      country,
    });
    console.log(upload)

    if (!upload) {
      return res.status(400).json({
        message: "Sorry Pls Provide or validte somthing",
      });
    }

    res.status(200).json({
      message: "Successfully Booked Your Room ",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      errro: "server issue",
    });
  }
};

const activeRoomList = async (req, res) => {
  try {
    const { roomid } = req.headers;

    const result = await ProductModel.findById(roomid);

    if (!result) {
      return res.status(401).json({
        message: "Sorry there is no identity is there",
      });
    }

    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(402).json({
      message: "Sorry error message from server ",
    });
  }
};

const getAllRoom = async (req, res) => {
  const { buildid } = req.headers;

  try {
    const build = await BuildModel.findOne({ _id: buildid }).populate(
      "natural"
    );
    console.log(build);
    res.status(200).json(build);
  } catch (error) {
    console.error("Error fetching building:", error);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const uploadRoom = async (req, res) => {
  try {
    const { title, prize, buildingId, number } = req.body;

    const uploadToDatabase = await ProductModel.create({
      title,
      prize,

      number,
    });

    const findByBuild = await BuildModel.findByIdAndUpdate(buildingId, {
      $push: { natural: uploadToDatabase._id },
    });
    if (!findByBuild) {
      return res.status(402).json({
        message: "sorry this building is not found ",
      });
    }

    res.status(200).json(findByBuild);
  } catch (error) {
    console.error("Error in upload route:", error);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const getAllBuilding = async (req, res) => {
try {
  const BuildData = await BuildModel.find();
  if (!BuildData) {
    return res.status(402).json({
      message: " sorry there Is No Building ",
    });
  }
  console.log(BuildData);
  res.status(200).json(BuildData);
} catch (error) {
  console.log(error);
  res.status(404).json({
    message: `error from backend${error}`,
  });
}
};

const uploadBuilding = async (req, res) => {
  try {
    const { name, zip, state, address, city } = req.body;

    console.log(req.body);
    const upload = await BuildModel.create({
      name,
      zip,
      state,
      address,
      city,
    });

    console.log(upload);

    res.status(200).json({
      message: "SuccussFully Uploaded",
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      message: `error from backend${error}`,
    });
  }
}

module.exports = {
  bookRoom,
  activeRoomList,
  getAllRoom,
  uploadRoom,
  getAllBuilding,
  uploadBuilding
};
