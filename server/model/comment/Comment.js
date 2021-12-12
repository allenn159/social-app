const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const commentSchema = new mongoose.Schema(
  {
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: [true, "A post is required"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "A user is required"],
    },
    description: {
      type: String,
      required: [true, "The comment description is required"],
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

commentSchema.plugin(mongoosePaginate);

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
