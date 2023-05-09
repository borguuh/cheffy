const express = require("express");
const router = express.Router();

const {
  getAllNotifications,
  getUserNotifications,
  addNotification,
  blockNotification,
  firebaseAddNotification,
} = require("../../controllers/User/notification_controller");

router.post("/send-notification", firebaseAddNotification);
router.get("/get_all_notification", getAllNotifications);
router.get("/get_user_notifications", getUserNotifications);
router.post("/add_notification", addNotification);
router.put("/block_notification", blockNotification);

module.exports = router;
