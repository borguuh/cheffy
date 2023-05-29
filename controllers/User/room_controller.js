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

exports.searchRooms = catchAsyncFunc(async (req, res, next) => {
  const { name, page } = req.query;
  const perPage = 10; // Number of results per page

  // Constructing the query for name-based search
  const query = {
    roomName: { $regex: name, $options: "i" }, // Case-insensitive search for room name
  };

  try {
    const totalCount = await Room.countDocuments(query);
    const totalPages = Math.ceil(totalCount / perPage);

    const rooms = await Room.find(query)
      .skip((page - 1) * perPage)
      .limit(perPage);

    return res.json({
      totalRooms: totalCount,
      totalPages,
      currentPage: page,
      rooms,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
});

exports.getNearbyPlaces = catchAsyncFunc(async (req, res, next) => {
  const { latitude, longitude, distance } = req.query;

  try {
    const rooms = await Room.find({
      location: {
        $nearSphere: {
          $geometry: {
            type: "Point",
            coordinates: [parseFloat(longitude), parseFloat(latitude)],
          },
          $maxDistance: parseFloat(distance),
        },
      },
    });

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

exports.searchByRoommatesCount = catchAsyncFunc(async (req, res, next) => {
  try {
    const roommatesCount = parseInt(req.query.roommatesCount); // Get the desired roommates count from the query string

    const rooms = await Room.find({ roomates_count: roommatesCount });

    res.json(rooms);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

exports.filterRoomsByPriceRange = catchAsyncFunc(async (req, res, next) => {
  try {
    const minPrice = parseInt(req.query.minPrice); // Minimum price
    const maxPrice = parseInt(req.query.maxPrice); // Maximum price

    const rooms = await Room.find({
      roomPrice: { $gte: minPrice, $lte: maxPrice },
    });

    res.json(rooms);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

exports.filterRoomsByFeatures = catchAsyncFunc(async (req, res, next) => {
  try {
    const features = req.query.features; // Features to filter by, provided as an array in the query string

    const rooms = await Room.find({
      roomFeatures: { $in: features },
    });

    res.json(rooms);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

exports.filterHousesByDetails = catchAsyncFunc(async (req, res, next) => {
  try {
    const { rooms, kitchens, washrooms } = req.query; // Number of rooms, kitchens, and washrooms to filter by

    const houses = await Room.find({
      "details.house.rooms": rooms,
      "details.house.kitchens": kitchens,
      "details.house.washrooms": washrooms,
    });

    res.json(houses);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

exports.addRoom = catchAsyncFunc(async (req, res, next) => {
  const roomData = req.body;
  let images = req.files && req.files.images; // Check if req.files.images exists
  const imageLinks = [];

  if (images) {
    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.uploader.upload(images[i].tempFilePath, {
        folder: "Reviews",
      });

      imageLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }
  }

  const is_exist = await Room.findOne({ roomNumber: roomData.roomNumber });
  if (is_exist)
    return helper.sendError(403, res, { errors: "Room already exists" }, req);

  roomData.images = imageLinks;

  const result = await Room.create(roomData);
  return helper.sendSuccess(res, result, req, "Success");
});

exports.getRoomById = catchAsyncFunc(async (req, res, next) => {
  const roomId = req.query.id;

  try {
    const room = await Room.findById(roomId);

    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    res.json(room);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

exports.updateRoom = catchAsyncFunc(async (req, res, next) => {
  const roomData = req.body;
  const { room_id } = req.query;

  try {
    let images = req.files && req.files.images; // Check if req.files.images exists
    const imageLinks = [];

    if (images) {
      for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.uploader.upload(
          images[i].tempFilePath,
          {
            folder: "Reviews",
          }
        );

        imageLinks.push({
          public_id: result.public_id,
          url: result.secure_url,
        });
      }
    }

    roomData.images = imageLinks;

    const result = await Room.findByIdAndUpdate(room_id, roomData, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    if (!result) {
      return res.status(404).json({ error: "Room not found" });
    }

    return res.json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
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
