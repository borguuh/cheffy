const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema(
  {
    mobile: {
      type: Schema.Types.String,
      required: true,
    },
    otp: {
      type: Schema.Types.String,
      required: true,
    },
    expiresAt: {
      type: Schema.Types.Date,
      required: true,
    },
    messageSid: {
      type: Schema.Types.String,
      required: true,
    },
    isExpired: {
      type: Schema.Types.Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Otp", schema);
