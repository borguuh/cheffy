const HomeLocation = require("../../models/HomeLocation");
const helper = require("../../helper/helper");
const catchAsyncFunc = require("../../middlewares/catchAsyncFunc");
const cloudinary = require("cloudinary").v2;

// Create a new home location
exports.createHomeLocation = catchAsyncFunc(async (req, res, next) => {
  const homeData = req.body;
  const images = req.files.images;
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

  homeData.images = imageLinks;

  try {
    const result = await HomeLocation.create(homeData);
    return helper.sendSuccess(res, result, req, "Success");
  } catch (error) {
    console.error(error);
    // return helper.sendFailure(res, error.message, 500);
  }
});

// // Get all home locations
// const getAllHomeLocations = (req, res) => {
//   HomeLocation.find({}, (err, homeLocations) => {
//     if (err) {
//       console.error(err);
//       res.status(500).send("Error retrieving home locations");
//     } else {
//       res.send(homeLocations);
//     }
//   });
// };

// // Get a specific home location by ID
// const getHomeLocationById = (req, res) => {
//   HomeLocation.findById(req.params.id, (err, homeLocation) => {
//     if (err) {
//       console.error(err);
//       res.status(500).send("Error retrieving home location");
//     } else if (!homeLocation) {
//       res.status(404).send("Home location not found");
//     } else {
//       res.send(homeLocation);
//     }
//   });
// };

// // Update a home location by ID
// const updateHomeLocationById = (req, res) => {
//   HomeLocation.findByIdAndUpdate(
//     req.params.id,
//     req.body,
//     { new: true },
//     (err, updatedHomeLocation) => {
//       if (err) {
//         console.error(err);
//         res.status(500).send("Error updating home location");
//       } else if (!updatedHomeLocation) {
//         res.status(404).send("Home location not found");
//       } else {
//         res.send(updatedHomeLocation);
//       }
//     }
//   );
// };

// // Delete a home location by ID
// const deleteHomeLocationById = (req, res) => {
//   HomeLocation.findByIdAndDelete(req.params.id, (err, deletedHomeLocation) => {
//     if (err) {
//       console.error(err);
//       res.status(500).send("Error deleting home location");
//     } else if (!deletedHomeLocation) {
//       res.status(404).send("Home location not found");
//     } else {
//       res.send(deletedHomeLocation);
//     }
//   });
// };

// module.exports = {
//   createHomeLocation,
//   //   getAllHomeLocations,
//   //   getHomeLocationById,
//   //   updateHomeLocationById,
//   //   deleteHomeLocationById,
// };
