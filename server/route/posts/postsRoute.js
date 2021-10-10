const express = require("express");
const { createPostCtrl } = require("../../controllers/posts/postsController");
const authMiddleware = require("../../middleware/auth/authMiddleware");
const {
  pictureUpload,
  postImageResize,
} = require("../../middleware/uploads/pictureUpload");

const postRoute = express.Router();

postRoute.post(
  "/",
  authMiddleware,
  pictureUpload.single("image"),
  postImageResize,
  createPostCtrl
);

module.exports = postRoute;
