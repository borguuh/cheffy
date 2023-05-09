const mongoose = require("mongoose");
const ImageSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  public_id: {
    type: String,
    required: false,
  },
});

const reviewsSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    room: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "room",
      required: true,
    },

    images: {
      type: [ImageSchema],
      required: true,
      default: [],
    },
    comment: {
      type: String,
      required: true,
      maxlength: 1000,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    status: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("review", reviewsSchema);
