const Post = require("../../model/post/Post");
const Category = require("../../model/category/Category");
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
  const { _id } = req?.user;
  //   validateMongodbID(req.body.user);
  // Check for profane words in the post.
  const isProfane = filter.isProfane(req.body.title, req.body.description);

  if (isProfane) throw new Error("Post cannot contain profanity.");

  // Get the path to the image.
  const localPath = `public/images/posts/${req?.file?.fileName}`;
  // Upload to cloudinary
  const uploadedImg = await cloudinaryUploadImg(localPath);

  try {
    const post = await Post.create({
      ...req.body,
      image: uploadedImg?.url,
      user: _id,
    });
    // fs.unlinkSync is used to remove uploaded images in local file.
    res.send(post);
    // fs.unlinkSync(localPath);
  } catch (error) {
    res.send(error);
  }
});

//--------------------------------
// Fetch posts
//--------------------------------

const fetchPostsCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req?.params;
  const category = await Category.findById(id);
  try {
    // The populate method attaches the user information to the specific post.
    const posts = await Post.find({ category: category?._id }).populate("user");

    res.json(posts);
  } catch (error) {
    res.json(error);
  }
});

//--------------------------------
// Fetch single post
//--------------------------------

const fetchPostCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbID(id);
  try {
    const post = await Post.findById(id).populate("user").populate("comments");
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

//--------------------------------
// Like post
//--------------------------------

const toggleLikePostCtrl = expressAsyncHandler(async (req, res) => {
  // Find the post that is being liked.
  const { postId } = req.body;
  const post = await Post.findById(postId);
  // Find the login user
  const loginUserId = req?.user?._id;
  // Check if this user has liked a particular post.
  const isLiked = post?.likes.find(
    (userId) => userId.toString() === loginUserId.toString()
  );
  // Check if this user has disliked this particular post.
  const isDisliked = post?.disLikes?.find(
    (userId) => userId.toString() === loginUserId.toString()
  );

  const likesCounter = post?.likesCounter;
  const dislikesCounter = post?.dislikesCounter;

  // Remove the user from the dislikes array if they exist.
  if (isDisliked) {
    const post = await Post.findByIdAndUpdate(
      postId,
      {
        $pull: { disLikes: loginUserId },
        dislikesCounter: dislikesCounter === 0 ? 0 : dislikesCounter - 1,
        isDisliked: false,
        $push: { likes: loginUserId },
        likesCounter: likesCounter + 1,
        isLiked: true,
      },
      { new: true }
    );
    res.json(post);
  }
  // Toggle
  // Remove the user if they have liked the post.
  else if (isLiked) {
    const post = await Post.findByIdAndUpdate(
      postId,
      {
        $pull: { likes: loginUserId },
        likesCounter: likesCounter - 1,
        isLiked: false,
      },
      { new: true }
    );
    res.json(post);
  } else {
    // Add to likes
    const post = await Post.findByIdAndUpdate(
      postId,
      {
        $push: { likes: loginUserId },
        likesCounter: likesCounter + 1,
        isLiked: true,
      },
      { new: true }
    );
    res.json(post);
  }
});

//--------------------------------
// Dislike post
//--------------------------------

const toggleDislikePostctrl = expressAsyncHandler(async (req, res) => {
  // Find the post that is being liked.
  const { postId } = req.body;
  const post = await Post.findById(postId);
  // Find the login user
  const loginUserId = req?.user?._id;
  // Check if this user has liked a particular post.
  const isDisliked = post?.disLikes?.find(
    (userId) => userId.toString() === loginUserId.toString()
  );
  // Check if this user has disliked this particular post.
  const isLiked = post?.likes?.find(
    (userId) => userId?.toString() === loginUserId.toString()
  );

  const likesCounter = post?.likesCounter;
  const dislikesCounter = post?.dislikesCounter;

  // Toggle
  // Remove the user if they have liked the post.
  if (isLiked) {
    const post = await Post.findByIdAndUpdate(
      postId,
      {
        $pull: { likes: loginUserId },
        likesCounter: likesCounter === 0 ? 0 : likesCounter - 1,
        isLiked: false,
        $push: { disLikes: loginUserId },
        dislikesCounter: dislikesCounter + 1,
        isDisliked: true,
      },
      { new: true }
    );
    res.json(post);
  }
  // Toggle
  // Remove the user if they have disliked the post.
  else if (isDisliked) {
    const post = await Post.findByIdAndUpdate(
      postId,
      {
        $pull: { disLikes: loginUserId },
        dislikesCounter: dislikesCounter - 1,
        isDisliked: false,
      },
      { new: true }
    );
    res.json(post);
  } else {
    const post = await Post.findByIdAndUpdate(
      postId,
      {
        $push: { disLikes: loginUserId },
        dislikesCounter: dislikesCounter + 1,
        isDisliked: true,
      },
      { new: true }
    );
    res.json(post);
  }
});

module.exports = {
  createPostCtrl,
  fetchPostsCtrl,
  fetchPostCtrl,
  updatePostCtrl,
  deletePostCtrl,
  toggleLikePostCtrl,
  toggleDislikePostctrl,
};
