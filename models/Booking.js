const mongoose = require("mongoose");
const { Schema } = mongoose;

const bookingSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    room: {
      type: Schema.Types.ObjectId,
      ref: "room",
      required: true,
    },
    wishlist: {
      type: Schema.Types.ObjectId,
      ref: "wishlist",
      required: true,
    },
    checkInDate: {
      type: Date,
      required: true,
      validate: {
        validator: function (value) {
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          return value >= today;
        },
        message: "Check-in date must be today or later",
      },
    },
    checkOutDate: {
      type: Date,
      required: true,
      validate: {
        validator: function (value) {
          const checkInDate = this.checkInDate;
          return value > checkInDate;
        },
        message: "Check-out date must be after check-in date",
      },
    },
    status: {
      type: String,
      enum: ["active", "block"],
      default: "active",
    },
    payment: {
      amount: {
        type: Number,
        required: true,
      },
      currency: {
        type: String,
        default: "USD",
      },
      paymentMethod: {
        type: String,
        enum: ["credit_card", "paypal"],
        required: true,
      },
      paymentStatus: {
        type: String,
        enum: ["paid", "pending", "cancelled"],
        default: "pending",
      },
    },
  },
  { timestamps: true }
);

const Booking = mongoose.model("booking", bookingSchema);

module.exports = Booking;
