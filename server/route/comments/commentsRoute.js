const express = require("express");
const {
  createCommentCtrl,
  fetchCommentsCtrl,
  deleteCommentCtrl,
} = require("../../controllers/comments/commentController");
const authMiddleware = require("../../middleware/auth/authMiddleware");

const commentRoute = express.Router();

commentRoute.post("/", authMiddleware, createCommentCtrl);
commentRoute.get("/:id", authMiddleware, fetchCommentsCtrl);
commentRoute.delete("/:id", authMiddleware, deleteCommentCtrl);

module.exports = commentRoute;
