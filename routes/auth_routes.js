const express = require("express");
const router = express.Router();
const controller = require("../controllers/auth_controller");
const jwtMiddleware = require("../middlewares/jwt_middleware");
const fileUploadMiddleware = require("../middlewares/file_upload_middleware");
const {
  sendOTPValidators,
  verifyOTPValidators,
  setupProfileValidators,
  setPasswordValidators,
} = require("../middlewares/auth_middlewares");

// router.put(
//   "/setPassword",
//   jwtMiddleware,
//   setPasswordValidators,
//   controller.setPassword
// );

// router.post("/sendOTP", sendOTPValidators, controller.sendOTP);

// router.post("/verifyOTP", verifyOTPValidators, controller.verifyOTP);

// router.put(
//   "/setupProfile",
//   fileUploadMiddleware.uploadSingleFile,
//   jwtMiddleware,
//   setupProfileValidators,
//   controller.setupProfile
// );

module.exports = router;
