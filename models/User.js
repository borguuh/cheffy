const mongoose = require("mongoose");
const validator = require("validator");
// const jwt = require("jsonwebtoken");
// const crypto = require("crypto");
// const config = require("config");

const userSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: [true, "Please enter your first name."],
      maxLength: [30, "Name cannot be exceeded 30 char."],
      minlength: [3, "Name should have more than 3 char."],
    },
    last_name: {
      type: String,
      required: [true, "Please enter your last name."],
      maxLength: [30, "Name cannot be exceeded 30 char."],
      minlength: [3, "Name should have more than 3 char."],
    },
    email: {
      type: String,
      required: [true, "Please enter your email."],
      validate: [validator.isEmail, "Please enter a valid email"],
      unique: true,
    },
    password: {
      type: String,
      minlength: [8, "Password should be greater than 8 chars."],
      required: [true, "Please enter password."],
      select: false, //we cannot print it
    },
    country: {
      type: String,
    },
    phone: {
      type: Number,
      minlength: [10, "Phone number should be greater than 10 chars."],
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
module.exports = mongoose.model("user", userSchema);
