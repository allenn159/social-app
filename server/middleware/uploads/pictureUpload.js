const multer = require("multer");
const sharp = require("sharp");
const path = require("path");

// Multer and path are from node

// Storage
const multerStorage = multer.memoryStorage();

// File type check
const multerFilter = (req, file, callback) => {
  // Check file type
  if (file.mimetype.startsWith("image")) {
    // First argument as null means it was successful and true means to proceed with uploading the actual file.
    callback(null, true);
  } else {
    // Rejected files
    callback(
      {
        message: "Unsupported file type",
      },
      false
    );
  }
};

const pictureUpload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
  limits: { fileSize: 1000000 },
});

// Image resizing function
const profilePictureResize = async (req, res, next) => {
  // Check if there is a file
  if (!req.file) return next();

  // Add our own custom key to the req.file object
  // req.file.originalname is from the req object that contains the uploaded image.
  req.file.fileName = `user-${Date.now()}-${req.file.originalname}`;

  await sharp(req.file.buffer)
    .resize(250, 250)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(path.join(`public/images/profile/${req.file.fileName}`));
  next();
};

// Post image resizing
const postImageResize = async (req, res, next) => {
  // Check if there is a file
  if (!req.file) return next();

  // Add our own custom key to the req.file object
  // req.file.originalname is from the req object that contains the uploaded image.
  req.file.fileName = `user-${Date.now()}-${req.file.originalname}`;

  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(path.join(`public/images/posts/${req.file.fileName}`));
  next();
};

module.exports = { pictureUpload, profilePictureResize, postImageResize };
