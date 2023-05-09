const Review = require("../../models/Review");
const catchAsyncFunc = require("../../middlewares/catchAsyncFunc");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const multer = require("multer");
const helper = require("../../helper/helper");

// Set up multer storage and upload middleware
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });

exports.getReviews = catchAsyncFunc(async (req, res, next) => {
  const result = await Review.find({ status: 1 });
  helper.sendSuccess(res, { review: result }, req, "Success");
});

exports.addReview = catchAsyncFunc(async (req, res, next) => {
  console.log(req.files);
  let images = req.files.images;

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

  const reviewData = req.body;
  reviewData.images = imageLinks;
  reviewData.user = "63e6358b5b44bffc832bd922";
  reviewData.room = "644adb7d171735103dc83369";
  const result = await Review.create(reviewData);
  helper.sendSuccess(res, { review: result }, req, "Success");
});

exports.updateReview = catchAsyncFunc(async (req, res, next) => {
  const reviewData = req.body;
  const { review_id } = req.query;
  const result = await Review.findByIdAndUpdate(review_id, reviewData, {
    new: true,
    runValidators: true,
    userFindANdModify: false,
  });
  helper.sendSuccess(res, { review: result }, req, "Success");
});

exports.blockReview = catchAsyncFunc(async (req, res, next) => {
  // const reviewData = req.body;
  const { review_id } = req.query;
  const result = await Review.findByIdAndUpdate(
    review_id,
    { status: 0 },
    {
      new: true,
      runValidators: true,
      userFindANdModify: false,
    }
  );
  helper.sendSuccess(
    res,
    { msg: "Review blocked successfully." },
    req,
    "Success"
  );
});
exports.deleteReview = catchAsyncFunc(async (req, res, next) => {
  const { review_id } = req.query;
  const result = await Review.findByIdAndDelete(review_id);
  helper.sendSuccess(
    res,
    { msg: "Review deleted successfully." },
    req,
    "Success"
  );
});
