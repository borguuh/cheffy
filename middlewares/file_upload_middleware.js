const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

// Setting Storage and Filename for "multer"
const fileStoragePhoto = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, path.join(__dirname, "../", "uploads"));
  },
  filename: (req, file, callBack) => {
    callBack(null, `${uuidv4()}_${file.originalname}`);
  },
});

// Setting Filter for multer to not to accept files other than .png or .jpg
const fileFilter = (req, file, callBack) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    // null is sent as we have no errors.
    // true => accept the file
    callBack(null, true);
  } else {
    // null is sent as we have no errors.
    // false => reject the file.
    callBack(null, false);
  }
  // callBack(null, true);
};

exports.uploadSingleFile = async (req, res, next) => {
  // console.log("caption :- " + req.body.caption);
  // console.log(req.body);
  const uploadPost = multer({
    storage: fileStoragePhoto,
    fileFilter: fileFilter,
  }).single("file");

  uploadPost(req, res, async (error) => {
    if (error) {
      return res.end("error uploading file");
    }

    if (req.file) {
      let fileUrl = req.file.path + "";
      const indexOfImages = fileUrl.indexOf("uploads");
      fileUrl = fileUrl.substring(indexOfImages).replace(/\\/g, "/");

      // req.body.fileUrl = fileUrl;
      req.body.uploadedFile = { fileUrl, mimetype: req.file.mimetype };
    }

    next();
  });
};

exports.uploadMultipleFiles = async (req, res, next) => {
  const uploadPost = multer({
    storage: fileStoragePhoto,
    fileFilter: fileFilter,
  }).any();

  uploadPost(req, res, async (error) => {
    if (error) {
      return res.end("error uploading file");
    }

    if (req.files && req.files.length > 0) {
      const filesData = [];

      for (const data of req.files) {
        let fileUrl = data.path + "";
        const indexOfUploads = fileUrl.indexOf("uploads");
        fileUrl = fileUrl.substring(indexOfUploads).replace(/\\/g, "/");

        filesData.push({ fileUrl, mimetype: data.mimetype });
      }

      req.body.uploadedFiles = filesData;
    }

    next();
  });
};
