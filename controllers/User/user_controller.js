const User = require("../../models/User");
const helper = require("../../helper/helper");
const catchAsyncFunc = require("../../middlewares/catchAsyncFunc");

exports.getAllUsers = catchAsyncFunc(async (req, res, next) => {
  const result = await User.find();
  return helper.sendSuccess(res, result, req, "Success");
});

exports.addUser = catchAsyncFunc(async (req, res, next) => {
  const userData = req.body;
  const is_exist = await User.findOne({ email: userData.email });
  if (is_exist)
    return helper.sendError(403, res, { errors: "User already exists" }, req);

  const result = await User.create(userData);
  return helper.sendSuccess(res, result, req, "Success");
});
exports.updateUser = catchAsyncFunc(async (req, res, next) => {
  const userData = req.body;
  const { user_id } = req.query;
  const result = await User.findByIdAndUpdate(user_id, userData, {
    new: true,
    runValidators: true,
    userFindANdModify: false,
  });
  return helper.sendSuccess(res, result, req, "Success");
});
exports.blockUser = catchAsyncFunc(async (req, res, next) => {
  // const reviewData = req.body;
  const { user_id } = req.query;
  const result = await User.findByIdAndUpdate(
    user_id,
    { status: 0 },
    {
      new: true,
      runValidators: true,
      userFindANdModify: false,
    }
  );
  helper.sendSuccess(
    res,
    { msg: "User blocked successfully." },
    req,
    "Success"
  );
});

exports.deleteUser = catchAsyncFunc(async (req, res, next) => {
  const { user_id } = req.query;
  const result = await User.findByIdAndDelete(user_id);
  helper.sendSuccess(
    res,
    { msg: "User deleted successfully." },
    req,
    "Success"
  );
});
