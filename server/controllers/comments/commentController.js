const expressAsyncHandler = require("express-async-handler");
const Comment = require("../../model/comment/Comment");
const Post = require("../../model/post/Post");
const validateMongodbID = require("../../utils/validateMongodbID");

//--------------------------------
// Create comment
//--------------------------------

const createCommentCtrl = expressAsyncHandler(async (req, res) => {
  // Get the user from req.user
  const user = req.user;
  // Get the post Id
  const { postId, description } = req.body;

  try {
    const comment = await Comment.create({
      post: postId,
      description,
      user,
    });

    res.json(comment);
  } catch (error) {
    res.json(error);
  }
});

//--------------------------------
// Fetch comments
//--------------------------------

const fetchCommentsCtrl = expressAsyncHandler(async (req, res) => {
  // try {
  //   // Find all comments and sort from newest to oldest.
  //   const { id } = req?.params;
  //   const comments = await Comment.find({ post: id }).sort("-createdAt");
  //   res.json(comments);
  // } catch (error) {
  //   res.json(error);
  // }

  try {
    const { id } = req?.params;
    const comments = await Comment.paginate(
      { post: id },
      { sort: "-createdAt", page: req.query.page, limit: req.query.limit }
    );
    res.json(comments);
  } catch (error) {
    res.json(error);
  }
});

//--------------------------------
// Fetch single comment
//--------------------------------

// const fetchSingleCommentCtrl = expressAsyncHandler(async (req, res) => {
//   const { id } = req.params;
//   validateMongodbID(id);

//   try {
//     const comment = await Comment.findById(id);
//     res.json(comment);
//   } catch (error) {
//     res.json(error);
//   }
// });

//--------------------------------
// Update comment
//--------------------------------

// const updateCommentCtrl = expressAsyncHandler(async (req, res) => {
//   const { id } = req.params;
//   validateMongodbID(id);
//   try {
//     const update = await Comment.findByIdAndUpdate(
//       id,
//       {
//         post: req.body?.postId,
//         user: req?.user,
//         description: req?.body?.description,
//       },
//       { new: true, runValidators: true }
//     );
//     res.json(update);
//   } catch (error) {
//     res.json(error);
//   }
// });

//--------------------------------
// Delete comment
//--------------------------------

const deleteCommentCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbID(id);

  try {
    const comment = await Comment.findByIdAndDelete(id);
    res.json(comment);
  } catch (error) {
    res.json(error);
  }
});

module.exports = {
  createCommentCtrl,
  fetchCommentsCtrl,
  deleteCommentCtrl,
};
