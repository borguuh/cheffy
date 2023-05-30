const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const logger = require("./utils/winston");
const { StatusCodes } = require("http-status-codes");

// initialize dotenv
require("dotenv").config({ path: path.join(__dirname, ".env") });
const app = express();

const cloudinary = require("cloudinary");
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

var fileUpload = require("express-fileupload");
// default options
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: __dirname + "/uploads/",
  })
);

const authRoutes = require("./routes/auth_routes");
const hobbyInterestRoutes = require("./routes/hobby_interest_routes");
const adminHobbyInterestRoutes = require("./routes/admin/admin_hobby_interest_routes");
const notificationRoute = require("./routes/User/notification_route");
const reviewRoute = require("./routes/User/review_route");
const roomRoute = require("./routes/User/room_route");
const roomateRoute = require("./routes/User/roomate_route");
const userRoute = require("./routes/User/user_route");
const wishlistRoute = require("./routes/User/wishlist_route");
const bookingRoute = require("./routes/User/booking_route");
const newsletterRoute = require("./routes/User/newsletter_route");

// Connection String
const MONGODB_URI = process.env.MONGODB_URI;

// (Enabling all CORS) Allowing different servers and applications to connect with our Rest-API
app.use(cors());

// Setting parsers for parsing the incoming data
app.use(
  express.urlencoded({ limit: "1000mb", extended: true, parameterLimit: 50000 })
); // x-www-form-urlencoded <form>
app.use(express.raw({ limit: "1000mb" }));
app.use(express.json({ limit: "1000mb" })); // application/json

// Setting static` path to images folder.
// "static" method is given by "Express", and used to set static folder.
// "/images" means every request that comes to this path(url) goes to this.
// "__dirname" gives the absolute path of this file. like we are in app.js so it gives "/"
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Registering Routes
app.use("/auth", authRoutes);
app.use("/hoddyInterest", hobbyInterestRoutes);
app.use("/v1/hoddyInterest", adminHobbyInterestRoutes);
app.use("/v1/user", notificationRoute);
app.use("/v1/user", reviewRoute);
app.use("/v1/user", roomRoute);
app.use("/v1/user", roomateRoute);
app.use("/v1/user", userRoute);
app.use("/v1/user", wishlistRoute);
app.use("/v1/user", bookingRoute);
app.use("/v1/user", newsletterRoute);

// Express's error handling middleware
// Everytime either the error is thrown by 'throw' keyword or by calling 'next(error)',
// this middleware will be executed.
app.use((error, req, res, next) => {
  logger.error(`Error :: ${req.originalUrl} :: ${error}`);

  const status = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;

  const message =
    error.message || "Something went wrong, please try again later";

  res.status(status).json({ success: false, msg: message });
});

// Connecting to MongoDB and starting server
mongoose
  .connect(MONGODB_URI || "", { appName: process.env.APP_NAME })
  .then((result) => {
    const server = app.listen(process.env.PORT);
    logger.info("MongoDB Connected");
    console.log("Connected!");
  })
  .catch((error) => {
    logger.error(`ERROR :: MongoDB Connection :: ${error}`);
    console.log(error);
  });
