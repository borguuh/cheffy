const { body } = require("express-validator");

const mobileFieldValidator = body("mobile", "Mobile is required")
  .exists({ checkNull: true })
  .trim()
  .notEmpty();

const setPasswordValidators = [
  mobileFieldValidator,
  body("password", "Password is required")
    .exists({ checkNull: true })
    .trim()
    .notEmpty(),
];

const sendOTPValidators = mobileFieldValidator;

const verifyOTPValidators = [
  mobileFieldValidator,
  body("otp", "OTP is required").exists({ checkNull: true }).trim().notEmpty(),
];

const setupProfileValidators = [
  body("fName", "First Name is required")
    .exists({ checkNull: true })
    .trim()
    .notEmpty(),

  body("lName", "Last Name is required")
    .exists({ checkNull: true })
    .trim()
    .notEmpty(),

  body("dob", "Date of birth is required")
    .exists({ checkNull: true })
    .trim()
    .notEmpty(),

  body("gender", "Gender is required")
    .exists({ checkNull: true })
    .trim()
    .notEmpty(),
];

module.exports = {
  setPasswordValidators,
  sendOTPValidators,
  verifyOTPValidators,
  setupProfileValidators,
};
