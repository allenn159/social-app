const Post = require("../../model/post/Post");
const Filter = require("bad-words");
const expressAsyncHandler = require("express-async-handler");
const User = require("../../model/user/User");
const validateMongodbID = require("../../utils/validateMongodbID");
const cloudinaryUploadImg = require("../../utils/cloudinary");

const filter = new Filter();

const createPostCtrl = expressAsyncHandler(async (req, res) => {
  const { _id } = req.user;
  //   validateMongodbID(req.body.user);
  // Check for profane words in the post.
  const isProfane = filter.isProfane(req.body.title, req.body.description);

  if (isProfane) throw new Error("Post cannot contain profanity.");

  // Get the path to the image.
  const localPath = `public/images/posts/${req.file.fileName}`;
  // Upload to cloudinary
  const uploadedImg = await cloudinaryUploadImg(localPath);

  try {
    const post = await Post.create({
      ...req.body,
      image: uploadedImg?.url,
      user: _id,
    });
    res.send(post);
  } catch (error) {
    res.send(error);
  }
});

module.exports = { createPostCtrl };
