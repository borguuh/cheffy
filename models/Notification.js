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

const notificationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    notification: {
      title: {
        type: String,
        required: true,
      },
      body: {
        type: String,
        required: true,
      },
    },
    token: {
      type: String,
      required: true,
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

module.exports = mongoose.model("notification", notificationSchema);
