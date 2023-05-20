const express = require("express");
const router = express.Router();
const {
  getAllRoomates,
  getRoomates,
  addRoomate,
  searchRoomates,
  searchByRoomatesCount,
  updateRoomateProfile,
  deleteRoomate,
} = require("../../controllers/User/roomate_controller");

router.get("/get_all_roomates", getAllRoomates);
router.get("/get_roomates", getRoomates);
router.get("/search_by_roomates_count", searchByRoomatesCount);
router.get("/search_roomates", searchRoomates);
router.post("/add_roomate", addRoomate);
router.put("/update_roomate_profile", updateRoomateProfile);
router.delete("/perm_del_roomate", deleteRoomate);

module.exports = router;
