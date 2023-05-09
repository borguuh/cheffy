const catchAsyncFunc = require("../../middlewares/catchAsyncFunc");
const Notification = require("../../models/Notification");
const helper = require("../../helper/helper");
const cloudinary = require("cloudinary").v2;
const admin = require("firebase-admin");
const serviceAccount = require("../../firebase_service_account_key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://test-861cc-default-rtdb.firebaseio.com",
});
const messaging = admin.messaging();
const serverKey =
  "AAAA0wCc5gc:APA91bHIaeru2ztXNKKgv588jUxL5yJCWoYrOouA7PFYmIY1y8bUt3VDukK-CRbfoEaButxvMbKaVKH9jBeAlDAuhHhEU2DeNvngW1XJttxYkyuFGapoOg6peB9mum01HDVfwNZOWyx6";
exports.firebaseAddNotification = catchAsyncFunc(async (req, res, next) => {
  const { title, body, token } = req.body;
  const { userId } = req.query;
  const message = {
    notification: {
      title: title,
      body: body,
    },
    token: token,
  };

  await messaging
    .send(message)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });

  const notificationData = {
    user: userId,
    notification: {
      title: title,
      body: body,
    },
    token: token,
  };
  const result = await Notification.create(notificationData);
  return helper.sendSuccess(res, result, req, "Success");
});

exports.getAllNotifications = catchAsyncFunc(async (req, res, next) => {
  const result = await Notification.find({ status: 1 });
  return helper.sendSuccess(res, result, req, "Success");
});

exports.getUserNotifications = catchAsyncFunc(async (req, res, next) => {
  const { user_id } = req.query;
  const result = await Notification.find({ user: user_id });
  return helper.sendSuccess(res, result, req, "Success");
});

exports.addNotification = catchAsyncFunc(async (req, res, next) => {
  const notificationData = req.body;
  const { user_id } = req.query;
  notificationData.user = user_id;
  let images = req.files.images;
  const imageLinks = [];

  for (let i = 0; i < images.length; i++) {
    console.log(images[i]);
    const result = await cloudinary.uploader.upload(images[i].tempFilePath, {
      folder: "Reviews",
    });

    imageLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }
  notificationData.images = imageLinks;
  const result = await Notification.create(notificationData);
  return helper.sendSuccess(res, result, req, "Success");
});
exports.blockNotification = catchAsyncFunc(async (req, res, next) => {
  const { user_id, notification_id } = req.query;
  const result = await Notification.findByIdAndUpdate(
    notification_id,
    { status: 0 },
    {
      new: true,
      runValidators: true,
      userFindANdModify: false,
    }
  );
  return helper.sendSuccess(res, result, req, "Success");
});
