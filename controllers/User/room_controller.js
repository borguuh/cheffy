const Room = require("../../models/Room");
const helper = require("../../helper/helper");
const catchAsyncFunc = require("../../middlewares/catchAsyncFunc");
const cloudinary = require("cloudinary").v2;

exports.getAllRooms = catchAsyncFunc(async (req, res, next) => {
  const result = await Room.find();
  return helper.sendSuccess(res, result, req, "Success");
});

exports.getRoomsByLocation = catchAsyncFunc(async (req, res, next) => {
  const { location } = req.query;

  try {
    const rooms = await Room.find({ "details.house.address": location });

    res.json(rooms);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

exports.getPlaceByType = catchAsyncFunc(async (req, res) => {
  const looking_places = req.query.looking_places
    ? req.query.looking_places.toString()
    : "";
  const room_type = req.query.room_type ? req.query.room_type.toString() : "";
  const room_status = req.query.room_status
    ? req.query.room_status.toString()
    : "";
  const room_feature = req.query.room_feature
    ? req.query.room_feature.toString()
    : "";

  const results = await Room.find({
    $or: [
      { lookingPlaces: { $regex: looking_places, $options: "i" } },
      { roomType: { $regex: room_type, $options: "i" } },
      { roomStatus: { $regex: room_status, $options: "i" } },
      { roomFeature: { $regex: room_feature, $options: "i" } },
    ],
  });

  res.status(200).json({ results });
});

exports.addRoom = catchAsyncFunc(async (req, res, next) => {
  const roomData = req.body;
  let images = req.files.images;
  const imageLinks = [];

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.uploader.upload(images[i].tempFilePath, {
      folder: "Reviews",
    });

    imageLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }
  const is_exist = await Room.findOne({ roomNumber: roomData.roomNumber });
  if (is_exist)
    return helper.sendError(403, res, { errors: "Room already exists" }, req);
  roomData.images = imageLinks;

  const result = await Room.create(roomData);
  return helper.sendSuccess(res, result, req, "Success");
});

exports.updateRoom = catchAsyncFunc(async (req, res, next) => {
  const roomData = req.body;
  const { room_id } = req.query;
  const result = await Room.findByIdAndUpdate(room_id, roomData, {
    new: true,
    runValidators: true,
    userFindANdModify: false,
  });
  return helper.sendSuccess(res, result, req, "Success");
});

exports.deleteRoom = catchAsyncFunc(async (req, res, next) => {
  const { room_id } = req.query;
  const result = await Room.findByIdAndDelete(room_id);
  helper.sendSuccess(
    res,
    { msg: "Room deleted successfully." },
    req,
    "Success"
  );
});
