const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  addUser,
  updateUser,
  blockUser,
  deleteUser,
  getUserById,
} = require("../../controllers/User/user_controller");

router.get("/get_all_users", getAllUsers);
router.get("/get_user_by_id", getUserById);
router.post("/add_user", addUser);
router.patch("/update_user", updateUser);
router.put("/soft_del_user", blockUser);
router.delete("/perm_del_user", deleteUser);

module.exports = router;
