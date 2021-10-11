const express = require("express");
const {
  createPostCtrl,
  fetchPostsCtrl,
  fetchPostCtrl,
  updatePostCtrl,
  deletePostCtrl,
} = require("../../controllers/posts/postsController");
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
postRoute.get("/", fetchPostsCtrl);
postRoute.get("/:id", fetchPostCtrl);
postRoute.put("/:id", authMiddleware, updatePostCtrl);
postRoute.delete("/:id", authMiddleware, deletePostCtrl);

module.exports = postRoute;
