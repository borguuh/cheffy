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
    runValidators: true,
    // userFindANdModify: false,
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
