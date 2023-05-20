const mongoose = require("mongoose");
const { Schema } = mongoose;
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
const roomSchema = new Schema(
  {
    roomNumber: {
      type: Number,
      required: true,
      unique: true,
      min: 1,
    },
    images: {
      type: [ImageSchema],
      required: true,
      default: [],
    },
    roomName: {
      type: String,
      required: true,
    },
    lookingPlaces: {
      type: String,
      required: true,
    },
    reserveFrom: {
      type: Date,
      // required: [true, 'Date is required.'],
      validate: {
        validator: function (value) {
          return value instanceof Date && !isNaN(value);
        },
        message: "Invalid date.",
      },
    },
    reserveTo: {
      type: Date,
      // required: [true, 'Date is required.'],
      validate: {
        validator: function (value) {
          return value instanceof Date && !isNaN(value);
        },
        message: "Invalid date.",
      },
    },

    roomType: {
      type: String,
      required: true,
      enum: ["standard", "deluxe", "suite"],
    },
    roomDescription: {
      type: String,
    },
    roomStatus: {
      type: String,
      required: true,
      enum: ["vacant", "occupied", "maintenance", "out of order"],
    },
    roomPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    roomFeatures: {
      type: [String],
      // required: true,
      enum: ["Wi-Fi", "air conditioning", "mini-bar"],
    },
    longitude: {
      type: Number,
      required: true,
    },
    latitude: {
      type: Number,
      required: true,
    },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

roomSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("room", roomSchema);
