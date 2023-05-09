const express = require("express");
const router = express.Router();
const {
  getAllRoomates,
  getRoomates,
  addRoomate,
  updateRoomateProfile,
  deleteRoomate,
} = require("../../controllers/User/roomate_controller");

router.get("/get_all_roomates", getAllRoomates);
router.get("/get_roomates", getRoomates);
router.post("/add_roomate", addRoomate);
router.put("/update_roomate_profile", updateRoomateProfile);
router.delete("/perm_del_roomate", deleteRoomate);

module.exports = router;
