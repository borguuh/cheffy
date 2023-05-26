const express = require("express");
const router = express.Router();
const {
  getAllRooms,
  getRoomsByLocation,
  getNearbyPlaces,
  getPlaceByType,
  searchByRoommatesCount,
  filterRoomsByPriceRange,
  filterRoomsByFeatures,
  filterHousesByDetails,
  addRoom,
  updateRoom,
  deleteRoom,
} = require("../../controllers/User/room_controller");

router.get("/get_all_rooms", getAllRooms);
router.get("/get_by_location", getRoomsByLocation);
router.get("/get_nearby_places", getNearbyPlaces);
router.get("/get_by_type", getPlaceByType);
router.get("/rooms/search", searchByRoommatesCount);
router.get("/rooms/filter", filterRoomsByPriceRange);
router.get("/rooms/filter_features", filterRoomsByFeatures);
router.get("/houses/filter", filterHousesByDetails);
router.post("/add_room", addRoom);
router.put("/update_room", updateRoom);
router.delete("/perm_del_room", deleteRoom);

module.exports = router;
