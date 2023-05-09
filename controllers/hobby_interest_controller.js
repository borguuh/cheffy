const HobbyInterest = require("../models/hobby_interest_model");
const { StatusCodes } = require("http-status-codes");

exports.getAllHobbyInterest = async (req, res, next) => {
  try {
    const data = await HobbyInterest.find();

    if (!data) {
      return next(new Error("Something went wrong, please try again later"));
    }

    return res.status(StatusCodes.OK).json({
      success: true,
      msg: "Hobby/Interest list",
      data,
    });
  } catch (err) {
    console.log(`ERROR :: getAllHobbyInterest :: ${err}`);
    next(err);
  }
};
