const User = require("../models/user_model");
const Otp = require("../models/otp_model");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { StatusCodes } = require("http-status-codes");
const { generateOTP, sendSMS } = require("../utils/utils");
const moment = require("moment");

exports.signup = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(new Error(errors.array()[0].msg));
  }

  const { mobile, password } = req.body;

  try {
    const existingUser = await User.findOne({ mobile });

    if (existingUser) {
      return next(new Error("Mobile already exists"));
    }

    const encryptedPassword = await bcrypt.hash(password, 12);

    const user = new User({ mobile, password: encryptedPassword });

    const createdUser = await user.save();

    // @ts-ignore
    const token = jwt.sign({ id: createdUser._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    // @ts-ignore
    delete createdUser.password;

    return res.status(StatusCodes.CREATED).json({
      success: true,
      msg: "Registration has been successful",
      data: { ...createdUser, token },
    });
  } catch (err) {
    console.log(`ERROR :: signup :: ${err}`);
    next(err);
  }
};

exports.login = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(new Error(errors.array()[0].msg));
  }

  const { mobile, password } = req.body;

  try {
    const user = await User.findOne({ mobile });

    if (!user) {
      return next(new Error("User not found"));
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return next(new Error("Invalid Password"));
    }

    // generate JWT token
    const token = jwt.sign(
      { id: user._id.toString() },
      // @ts-ignore
      process.env.JWT_SECRET,
      {
        expiresIn: "30d",
      }
    );

    // removing unneccessary data from data to be sent
    // @ts-ignore
    delete user.password;

    return res.status(StatusCodes.OK).json({
      success: true,
      msg: "Logged in successfully",
      data: { ...user, token },
    });
  } catch (err) {
    console.log(`ERROR :: login :: ${err}`);
    next(err);
  }
};

exports.updateFCMToken = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(new Error(errors.array()[0].msg));
  }

  const { id } = req;
  const { fcmToken } = req.body;

  try {
    const user = await User.findByIdAndUpdate(id, { fcmToken }, { new: true });

    if (!user) {
      return next(new Error("Something went wrong, please try again later"));
    }

    return res.status(StatusCodes.CREATED).json({
      success: true,
      msg: "FCM Token has been updated successfully",
    });
  } catch (err) {
    console.log(`ERROR :: updateFCMToken :: ${err}`);
    next(err);
  }
};

exports.setPassword = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(new Error(errors.array()[0].msg));
  }

  const { mobile, password } = req.body;

  try {
    const user = await User.findOne({ mobile });

    if (!user) {
      return next(new Error("Account not found"));
    }

    const encryptedPassword = await bcrypt.hash(password, 12);
    user.password = encryptedPassword;

    const updatedUser = await user.save();

    // @ts-ignore
    delete updatedUser.password;

    return res.status(StatusCodes.CREATED).json({
      success: true,
      msg: "Password has been set successful",
      data: updatedUser,
    });
  } catch (err) {
    console.log(`ERROR :: setPassword :: ${err}`);
    next(err);
  }
};

// exports.sendOTP = async (req, res, next) => {
//   const errors = validationResult(req);

//   if (!errors.isEmpty()) {
//     return next(new Error(errors.array()[0].msg));
//   }

//   const { mobile } = req.body;

//   try {
//     // const user = await User.findOne({ mobile });

//     // if (!user) {
//     //   return next(new Error("User not found"));
//     // }

//     const currentDatetime = moment();

//     // Add 5 minutes to the current datetime
//     const expiresAt = currentDatetime.add(5, "minutes");

//     const generatedOTP = generateOTP();

//     const messageSid = await sendSMS(
//       mobile,
//       `Your OTP for verification is : ${generatedOTP}`
//     );

//     if (!messageSid) {
//       return next(new Error("Something went wrong, please try again later"));
//     }

//     const otp = new Otp({
//       mobile,
//       otp: generatedOTP,
//       expiresAt,
//       messageSid: "s",
//     });

//     await otp.save();

//     return res.status(StatusCodes.CREATED).json({
//       success: true,
//       msg: "OTP sent",
//     });
//   } catch (err) {
//     next(err);
//   }
// };

// exports.verifyOTP = async (req, res, next) => {
//   const errors = validationResult(req);

//   if (!errors.isEmpty()) {
//     return next(new Error(errors.array()[0].msg));
//   }

//   const { mobile, otp } = req.body;

//   try {
//     // const user = await User.findOne({ mobile });

//     // if (!user) {
//     //   return next(new Error("User not found"));
//     // }

//     const currentDateTime = moment().utc().format("YYYY-MM-DDTHH:mm:ss.SSSZ");

//     const data = await Otp.findOne({
//       $and: [
//         { mobile },
//         { otp },
//         { expiresAt: { $gte: currentDateTime } },
//         { isExpired: false },
//       ],
//     });

//     if (!data) {
//       return next(new Error("Invalid or expired OTP"));
//     }

//     data.isExpired = true;
//     await data.save();

//     return res.status(StatusCodes.OK).json({
//       success: true,
//       msg: "OTP verified",
//     });
//   } catch (err) {
//     console.log(`ERROR :: verifyOTP :: ${err}`);
//     next(err);
//   }
// };

exports.setupProfile = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(new Error(errors.array()[0].msg));
  }

  const { id } = req;
  const { fName, lName, dob, gender } = req.body;
  const hobbiesInterests = req.body.hobbiesInterests;
  const uploadedFile = req.body.uploadedFile;

  try {
    const user = await User.findById({ id });

    if (!user) {
      return next(new Error("User not found"));
    }

    user.fName = fName;
    user.lName = lName;
    user.gender = gender;
    user.dob = dob;

    if (hobbiesInterests) {
      user.hobbiesInterests = hobbiesInterests;
    }

    if (uploadedFile) {
      user.profilePic = uploadedFile.fileUrl;
    }

    const updatedUser = await user.save();

    // @ts-ignore
    delete updatedUser.password;

    return res.status(StatusCodes.CREATED).json({
      success: true,
      msg: "Profile setup completed",
      data: updatedUser,
    });
  } catch (err) {
    console.log(`ERROR :: setupProfile :: ${err}`);
    next(err);
  }
};
