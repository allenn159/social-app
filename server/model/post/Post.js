const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Post title is required."],
      trim: true,
    },
    // Created by only the admin.
    category: {
      type: String,
      required: [true, "Post category is required."],
    },
    isLiked: {
      type: Boolean,
      default: false,
    },
    isDisliked: {
      type: Boolean,
      default: false,
    },
    likesCounter: {
      type: Number,
      default: 0,
    },
    dislikesCounter: {
      type: Number,
      default: 0,
    },
    numViews: {
      type: Number,
      default: 0,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    disLikes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Author is required."],
    },
    description: {
      type: String,
      required: [true, "Post description is required."],
    },
    image: {
      type: String,
      default: null,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
    timestamps: true,
  }
);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
