const express = require("express");
const {
  createPostCtrl,
  fetchPostsCtrl,
  fetchPostCtrl,
  updatePostCtrl,
  deletePostCtrl,
  toggleLikePostCtrl,
  toggleDislikePostctrl,
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
postRoute.put("/likes", authMiddleware, toggleLikePostCtrl);
postRoute.put("/dislikes", authMiddleware, toggleDislikePostctrl);
postRoute.get("/:id", fetchPostsCtrl);
postRoute.get("/single/:id", fetchPostCtrl); // to get single post
postRoute.put("/:id", authMiddleware, updatePostCtrl);
postRoute.delete("/:id", authMiddleware, deletePostCtrl);

module.exports = postRoute;
