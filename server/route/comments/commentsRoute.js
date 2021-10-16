const express = require("express");
const {
  createCommentCtrl,
  fetchCommentsCtrl,
  fetchSingleCommentCtrl,
  updateCommentCtrl,
  deleteCommentCtrl,
} = require("../../controllers/comments/commentController");
const authMiddleware = require("../../middleware/auth/authMiddleware");

const commentRoute = express.Router();

commentRoute.post("/", authMiddleware, createCommentCtrl);
commentRoute.get("/", authMiddleware, fetchCommentsCtrl);
commentRoute.get("/:id", authMiddleware, fetchSingleCommentCtrl);
commentRoute.put("/:id", authMiddleware, updateCommentCtrl);
commentRoute.delete("/:id", authMiddleware, deleteCommentCtrl);

module.exports = commentRoute;
