const HomeLocation = require("../../models/HomeLocation");
const catchAsyncFunc = require("../../middlewares/catchAsyncFunc");

exports.search = catchAsyncFunc(async (req, res) => {
  // const name = req.query.name;
  // will return an error if req.query.name is null or undefined
  // so, it's done like this
  const name = req.query.name ? req.query.name.toString() : "";
  const address = req.query.address ? req.query.address.toString() : "";
  const city = req.query.city ? req.query.city.toString() : "";
  const state = req.query.state ? req.query.state.toString() : "";
  const zipCode = req.query.zipCode ? req.query.zipCode.toString() : "";

  const results = await HomeLocation.find({
    $or: [
      { name: { $regex: name, $options: "i" } },
      { address: { $regex: address, $options: "i" } },
      { city: { $regex: city, $options: "i" } },
      { state: { $regex: state, $options: "i" } },
      { zipCode: { $regex: zipCode, $options: "i" } },
    ],
  });

  res.status(200).json({ results });
});

exports.filter = async (req, res) => {
  const name = req.query.name ? req.query.name.toString() : "";
  const address = req.query.address ? req.query.address.toString() : "";
  const city = req.query.city ? req.query.city.toString() : "";
  const state = req.query.state ? req.query.state.toString() : "";
  const zipCode = req.query.zipCode ? req.query.zipCode.toString() : "";

  const filters = {
    ...(name && { name: { $regex: name, $options: "i" } }),
    ...(address && { address: { $regex: address, $options: "i" } }),
    ...(city && { city: { $regex: city, $options: "i" } }),
    ...(state && { state: { $regex: state, $options: "i" } }),
    ...(zipCode && { zipCode: { $regex: zipCode, $options: "i" } }),
  };

  const results = await HomeLocation.find(filters);

  res.status(200).json({ results });
};
