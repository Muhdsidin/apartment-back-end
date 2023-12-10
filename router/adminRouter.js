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
} = require("../controller/admin-controller");

router.post("/upload-building", uploadBuilding);
router.get("/get-building", getAllBuilding);
router.post("/upload", uploadRoom);
router.get("/get-room/", getAllRoom);
router.get("/get-active-room", activeRoomList);
router.post("/book-now", bookRoom);

module.exports = router;
