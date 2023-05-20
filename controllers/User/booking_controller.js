const Booking = require("../../models/Booking");
const catchAsyncFunc = require("../../middlewares/catchAsyncFunc");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const multer = require("multer");
const helper = require("../../helper/helper");

exports.getAllBookings = catchAsyncFunc(async (req, res, next) => {
  const result = await Booking.find({ status: "active" });
  return helper.sendSuccess(res, result, req, "Success");
});
exports.getUserBooking = catchAsyncFunc(async (req, res, next) => {
  const { userId } = req.query;
  const result = await Booking.find({ user: userId });
  return helper.sendSuccess(res, result, req, "Success");
});
exports.getBookingById = catchAsyncFunc(async (req, res, next) => {
  const { booking_id } = req.query;
  const result = await Booking.find({ _id: booking_id });
  return helper.sendSuccess(res, result, req, "Success");
});

exports.getBookingsByPeriod = catchAsyncFunc(async (req, res, next) => {
  const { period } = req.query;

  try {
    let startDate, endDate;

    if (period === "today") {
      startDate = new Date();
      endDate = new Date();
    } else if (period === "thisweek") {
      const today = new Date();
      const currentDay = today.getDay();

      startDate = new Date(today.setDate(today.getDate() - currentDay));
      endDate = new Date(today.setDate(today.getDate() + 6));
    } else {
      // Handle invalid or missing period query parameter
      return res.status(400).json({ error: "Invalid period" });
    }

    // Find bookings between startDate and endDate
    const bookings = await Booking.find({
      createdAt: {
        $gte: startDate,
        $lte: endDate,
      },
    });

    res.json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

exports.addBooking = catchAsyncFunc(async (req, res, next) => {
  const {
    userId,
    roomId,
    wishlistId,
    checkInDate,
    checkOutDate,
    paymentAmount,
    paymentCurrency,
    paymentMethod,
    paymentStatus,
  } = req.body;
  const bookingData = {
    user: userId,
    room: roomId,
    wishlist: wishlistId,
    checkInDate: checkInDate,
    checkOutDate: checkOutDate,
    payment: {
      amount: paymentAmount,
      currency: paymentCurrency,
      paymentMethod: paymentMethod,
      paymentStatus: paymentStatus,
    },
  };
  console.log(bookingData);
  const result = await Booking.create(bookingData);
  return helper.sendSuccess(res, result, req, "Success");
});
exports.updateBooking = catchAsyncFunc(async (req, res, next) => {
  const { bookingId } = req.query;
  const {
    userId,
    roomId,
    wishlistId,
    checkInDate,
    checkOutDate,
    paymentAmount,
    paymentCurrency,
    paymentMethod,
    paymentStatus,
  } = req.body;
  const bookingData = {
    user: userId,
    room: roomId,
    wishlist: wishlistId,
    checkInDate: checkInDate,
    checkOutDate: checkOutDate,
    payment: {
      amount: paymentAmount,
      currency: paymentCurrency,
      paymentMethod: paymentMethod,
      paymentStatus: paymentStatus,
    },
  };

  console.log(bookingData);

  const result = await Booking.findByIdAndUpdate(bookingId, bookingData, {
    new: true,
    // runValidators: true,
    // useFindAndModify: false,
  });
  return helper.sendSuccess(
    res,
    { msg: "Booking updated successfully." },
    req,
    "Success"
  );
});

exports.deleteBooking = catchAsyncFunc(async (req, res, next) => {
  const { bookingId } = req.query;
  await Booking.findByIdAndDelete(bookingId);
  return helper.sendSuccess(
    res,
    { msg: "Booking deleted successfully." },
    req,
    "Success"
  );
});
