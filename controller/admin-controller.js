const BookModel = require("../models/Book-Model");
const BuildModel = require("../models/Build-Model");
const ProductModel = require("../models/Product-Model");
const DeleteModel = require("../models/Delete-Tannent");
const { catchError } = require("../utils/error");
const AdminModel = require("../models/Admin-model");

const bookRoom = async (req, res) => {
  try {
    console.log("hello world ");
    const { name, address, state, RoomId, region, country, from, to } =
      req.body;
    console.log(req.body);
    const updateTheRoom = await ProductModel.findByIdAndUpdate(RoomId, {
      $set: { book: "true" },
    });
    console.log(updateTheRoom);

    const upload = await BookModel.create({
      name,
      address,
      state,
      roomNo: RoomId,
      region,
      country,
      from,
      to,
    });
    console.log(upload);

    if (!upload) {
      return res.status(400).json({
        message: "Sorry Pls Provide or validte somthing",
      });
    }

    res.status(200).json(upload);
  } catch (error) {
    catchError();
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
    catchError();
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
    catchError();
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
    catchError();
  }
};

const getAllBuilding = async (req, res) => {
  try {
    const BuildData = await BuildModel.find();
    res.status(200).json(BuildData);
  } catch (error) {
    catchError();
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
    catchError();
  }
};

/*
 TODO: Chnage needed in get ALL Boooks
 */
const getAllBookedRooms = async (req, res) => {
  try {
    const data = await BookModel.find();
    /*  if(data.length == 0){
     return res.status(400).json({
        message:"THERE IS NO ONE BOOKED "
      })
    }*/ // front-end issue so we will soon
    data.map((val) => {
      const dateFrom = new Date(val.from);
      const dateto = new Date(val.to);
      //console.log(dateFrom - dateto)
      console.log(dateto.getDate() - dateFrom.getDate()); // TODO: change needed
    });
    res.status(200).json(data);
  } catch (error) {
    catchError();
  }
};

const TerminateBook = async (req, res) => {
  try {
    const { BookId } = req.body;

    const terminate = await BookModel.findByIdAndUpdate(BookId, {
      $set: { terminate: true },
    });
    

    const data = await BookModel.find();
    res.status(200).json(data);
  } catch (error) {
    catchError();
  }
};

const getSpecificTannent = async (req, res) => {
  try {
    const { id } = req.headers;
    console.log(id);
    const data = await BookModel.findById(id);
    console.log(data);
    res.status(200).json(data);
  } catch (error) {
    catchError();
  }
};

const deleteRoom = async (req, res) => {
  try {
    const { roomId } = req.body;
    const dltRoom = await ProductModel.findByIdAndDelete(roomId);
    res.status(200).json({
      message: "just refresh",
    });
  } catch (error) {
    catchError();
  }
};

const updateRoom = async (req, res) => {
  try {
    const { title, id, prize } = req.body;
    const update = await ProductModel.findByIdAndUpdate(id, {
      $set: { title: title, prize: prize },
    });
    res.status(200).json({
      message: "succesfully updated ",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "server error",
    });
  }
};

const EditTannent = async (req, res) => {
  try {
    console.log(req.body);
    const { name, address, region, country, state, TannentId } = req.body;
    const findandUpdate = await BookModel.findByIdAndUpdate(TannentId, {
      $set: {
        name,
        address,
        region,
        country,
        state,
      },
    });

    res.status(200).json({
      message: " succesfully Updated ",
    });
  } catch (error) {
    catchError();
  }
};

const deleteBuilding = async (req, res) => {
  try {
    const { BuildId } = req.body;
    const deleteById = await BuildModel.findByIdAndDelete(BuildId);
    const result = await BuildModel.find();

    res.status(200).json(result);
  } catch (error) {
    catchError();
  }
};

const GetOneRoom = async (req, res) => {
  try {
    const { id } = req.headers;
    const findOne = await BuildModel.findById(id);
    res.status(200).json(findOne);
  } catch (error) {
    catchError();
  }
};

const UpdateBuilding = async (req, res) => {
  try {
    const { name, zip, state, address, city, id } = req.body;
    const upadteAll = await BuildModel.findByIdAndUpdate(id, {
      $set: {
        name,
        zip,
        state,
        address,
        city,
      },
    });
    res.status(200).json({
      message: "successFully Updated",
    });
  } catch (error) {
    catchError();
  }
};

const SearchTannent = async (req, res) => {
  try {
    const { item } = req.params;
    const findbyitem = await BookModel.findOne({ name: item });
    console.log(findbyitem);
    res.status(200).json(findbyitem);
  } catch (error) {
    catchError();
  }
};

const searchBuilding = async (req, res) => {
  try {
    const buildname = req.headers;
    const search = await BuildModel.findOne({ name: buildname });
    res.status(200).json(search);
  } catch (error) {
    catchError();
  }
};

const DeleteTannent = async (req, res) => {
  const { id } = req.body;

  // Find the existing Delete document (if any)
  let deleteDocument = await DeleteModel.findOne();

  if (!deleteDocument) {
    deleteDocument = new DeleteModel({});
  }

  deleteDocument.Deleted_tannent.push(id);

  await deleteDocument.save();

  const RealDelete = await BookModel.findByIdAndDelete(id)

  res
    .status(201)
    .json({
      message: "ID added to Deleted_tannent array successfully",
      document: deleteDocument,
    });
};

const CheckAdmin = async(req,res)=>{
  try {
    const {email , password} = req.body
    const admin = await AdminModel.findOne({email})

    if(!admin){
      return res.status(404).json({message:"admin not found"})
    }
    

    res.status(200).json(admin._id)
  } catch (error) {
    console.log(error.message)
  }
}



module.exports = {
  CheckAdmin,
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
  EditTannent,
  deleteBuilding,
  GetOneRoom,
  UpdateBuilding,
  SearchTannent,
  searchBuilding,
  DeleteTannent,
 
};
