const Post = require("../../model/post/Post");
const Filter = require("bad-words");
const fs = require("fs");
const expressAsyncHandler = require("express-async-handler");
const validateMongodbID = require("../../utils/validateMongodbID");
const cloudinaryUploadImg = require("../../utils/cloudinary");

const filter = new Filter();

//--------------------------------
// Create post
//--------------------------------

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

    // Remove uploaded images in local file.
    fs.unlinkSync(localPath);
  } catch (error) {
    res.send(error);
  }
});

//--------------------------------
// Fetch posts
//--------------------------------

const fetchPostsCtrl = expressAsyncHandler(async (req, res) => {
  try {
    // The populate method attaches the user information to the specific post.
    const posts = await Post.find({}).populate("user");
    res.json(posts);
  } catch (error) {}
});

//--------------------------------
// Fetch single post
//--------------------------------

const fetchPostCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbID(id);
  try {
    const post = await Post.findById(id).populate("user");
    // Update number of views.
    await Post.findByIdAndUpdate(
      post.id,
      {
        // inc is a mongoose method to increase. you can also use dec.
        $inc: { numViews: 1 },
      },
      { new: true }
    );
    res.json(post);
  } catch (error) {
    res.json(error);
  }
});

//--------------------------------
// Update post
//--------------------------------

const updatePostCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbID(id);

  try {
    const post = await Post.findByIdAndUpdate(
      id,
      {
        ...req.body,
        // A user is required for a post on the model.
        user: req.user?._id,
      },
      { new: true }
    );
    res.json(post);
  } catch (error) {
    res.json(error);
  }
});

//--------------------------------
// Delete post
//--------------------------------

const deletePostCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbID(id);

  try {
    const deletedPost = await Post.findByIdAndDelete(id);
    res.json(deletedPost);
  } catch (error) {
    res.json(error);
  }
});

module.exports = {
  createPostCtrl,
  fetchPostsCtrl,
  fetchPostCtrl,
  updatePostCtrl,
  deletePostCtrl,
};
