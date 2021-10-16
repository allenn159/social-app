const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: [true, "A post is required"],
    },
    user: {
      type: Object,
      required: [true, "A user is required"],
    },
    description: {
      type: String,
      required: [true, "The comment description is required"],
    },
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
