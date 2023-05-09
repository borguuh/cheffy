const express = require("express");
const router = express.Router();
const {
  createHomeLocation,
} = require("../../controllers/User/home_controller");

// Create a new home location
router.post("/home-locations", createHomeLocation);

// // Get all home locations
// router.get("/home-locations", homeController.getAllHomeLocations);

// // Get a specific home location by ID
// router.get("/home-locations/:id", homeController.getHomeLocationById);

// // Update a home location by ID
// router.put("/home-locations/:id", homeController.updateHomeLocationById);

// // Delete a home location by ID
// router.delete("/home-locations/:id", homeController.deleteHomeLocationById);

module.exports = router;
