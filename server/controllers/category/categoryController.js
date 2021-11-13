const Category = require("../../model/category/Category");
const expressAsyncHandler = require("express-async-handler");

//--------------------------------
// Create category
//--------------------------------

const createCategoryCtrl = expressAsyncHandler(async (req, res) => {
  try {
    const category = await Category.create({
      user: req.user._id,
      title: req.body.title,
    });
    res.json(category);
  } catch (error) {
    res.json(error);
  }
});

//--------------------------------
// Fetch all categories
//--------------------------------

const fetchCategoriesCtrl = expressAsyncHandler(async (req, res) => {
  try {
    const categories = await Category.find({})
      .populate("user")
      .sort("-createdAt");
    res.json(categories);
  } catch (error) {
    res.json(error);
  }
});

//--------------------------------
// Fetch single category
//--------------------------------

const fetchCategoryCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const category = await Category.findById(id)
      .populate("user")
      .sort("-createdAt");
    res.json(category);
  } catch (error) {
    res.json(error);
  }
});

//--------------------------------
// Update single category
//--------------------------------

// const updateCategoryCtrl = expressAsyncHandler(async (req, res) => {
//   const { id } = req.params;
//   try {
//     const category = await Category.findByIdAndUpdate(
//       id,
//       {
//         title: req?.body?.title,
//       },
//       { new: true, runValidators: true }
//     );
//     res.json(category);
//   } catch (error) {
//     res.json(error);
//   }
// });

//--------------------------------
// Delete single category
//--------------------------------

const deleteCategoryCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const category = await Category.findByIdAndDelete(id);
    res.json(category);
  } catch (error) {
    res.json(error);
  }
});

module.exports = {
  createCategoryCtrl,
  fetchCategoriesCtrl,
  fetchCategoryCtrl,
  deleteCategoryCtrl,
};
