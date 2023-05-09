const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema(
  {
    fName: {
      type: Schema.Types.String,
      required: true,
      default: "",
    },
    lName: {
      type: Schema.Types.String,
      required: true,
      default: "",
    },
    mobile: {
      type: Schema.Types.String,
      required: true,
    },
    password: {
      type: Schema.Types.String,
      required: true,
    },
    dob: {
      type: Schema.Types.String,
      required: true,
      default: "",
    },
    gender: {
      type: Schema.Types.String,
      required: true,
      default: "",
    },
    profilePic: {
      type: Schema.Types.String,
      required: false,
      default: "",
    },
    hobbiesInterests: {
      type: Schema.Types.Array,
      required: false,
      default: [],
    },
    fcmToken: {
      type: Schema.Types.String,
      required: false,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", schema);
