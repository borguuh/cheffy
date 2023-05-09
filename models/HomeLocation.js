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

const homeLocationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  zipCode: {
    type: String,
    required: true,
  },
  coordinates: {
    type: {
      type: String,
      enum: ["Point"],
    },
    coordinates: {
      type: [Number],
    },
  },
  images: {
    type: [ImageSchema],
    required: true,
    default: [],
  },
  description: {
    type: String,
    required: true,
    default: [],
  },
});

homeLocationSchema.index({ coordinates: "2dsphere" });

module.exports = mongoose.model("HomeLocation", homeLocationSchema);
