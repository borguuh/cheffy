const express = require("express");
const router = express.Router();

const {
  getAllBookings,
  getUserBooking,
  getBookingById,
  getBookingsByPeriod,
  addBooking,
  updateBooking,
  deleteBooking,
} = require("../../controllers/User/booking_controller");

router.get("/get_all_bookings", getAllBookings);
router.get("/get_user_bookings", getUserBooking);
router.get("/get_booking_by_id", getBookingById);
router.get("/get_booking_by_period", getBookingsByPeriod);
router.post("/add_booking", addBooking);
router.put("/update_booking", updateBooking);
router.delete("/delete_booking", deleteBooking);

module.exports = router;
