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
  getSpecificTannent,
  deleteRoom,
  updateRoom,
} = require("../controller/admin-controller");

router.post("/upload-building", uploadBuilding);
router.get("/get-building", getAllBuilding);
router.post("/upload", uploadRoom);
router.get("/get-room/", getAllRoom);
router.get("/get-active-room", activeRoomList);
router.post("/book-now", bookRoom);
router.get("/get-all-book",getAllBookedRooms)
router.post("/terminate",TerminateBook)
router.get("/get-specific-tannent",getSpecificTannent)
router.post("/delete-room",deleteRoom)
router.post("/update-room",updateRoom)

module.exports = router;
