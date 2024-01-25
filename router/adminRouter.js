const express = require("express");
const router = express.Router();
const ProductModel = require("../models/Product-Model");
const BuildModel = require("../models/Build-Model");
const BookModel = require("../models/Book-Model");
const {
  bookRoom,
  activeRoomList,
  getAllRoom,
  uploadRoom,
  getAllBuilding,
  uploadBuilding,
  getAllBookedRooms,
  TerminateBook,
  deleteRoom,
  updateRoom,
  EditTannent,
  getSpecificTannent,
  deleteBuilding,
  GetOneRoom,
  UpdateBuilding,
  SearchTannent,
  terminatedBook,
} = require("../controller/admin-controller");
const RecycleModel = require("../models/Recycle-Model");

router.post("/upload-building", uploadBuilding);
router.post("/delete-building", deleteBuilding)
router.post("/update-building", UpdateBuilding)
router.get("/get-building", getAllBuilding);
router.get("/get-building-one",GetOneRoom)
router.post("/upload", uploadRoom);
router.get("/get-room/", getAllRoom);
router.get("/get-active-room", activeRoomList);
router.post("/book-now", async (req, res) => {
  try {
    console.log("hello world ");
    const { name, address, state, RoomId, region, country , from , to  } = req.body;
    console.log(req.body);
    const updateTheRoom = await ProductModel.findByIdAndUpdate(RoomId , {$set:{book:"true"}})
    console.log(updateTheRoom)

    const upload = await BookModel.create({
      name,
      address,
      state,
      roomNo: RoomId,
      region,
      country,
      from,
      to
    });
    console.log(upload);

    if (!upload) {
      return res.status(400).json({
        message: "Sorry Pls Provide or validte somthing",
      });
    }

    res.status(200).json(upload);
  } catch (error) {
    console.log(error);
    res.status(400).json({
      errro: "server issue",
    });
  }
});
router.get("/get-all-book",getAllBookedRooms)
router.post("/terminate",TerminateBook)
router.get("/get-specific-tannent",getSpecificTannent)
router.post("/delete-room",deleteRoom)
router.post("/update-room",updateRoom)
router.post("/update-tannent", EditTannent)

router.get("/:item",SearchTannent)


router.get("/amo", async (req, res) => {
  try {
    let RecycleData = await RecycleModel.find();

    if (RecycleData.length === 0) {
      RecycleData = new RecycleModel();
    }

    console.log(RecycleData, "======================");

    res.status(200).json({
      message: "hello world",
      data: RecycleData,
    });
  } catch (error) {
    console.error("Error in /amo route:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


module.exports = router;
