import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../slices/users/usersSlices";
import categoriesReducer from "../slices/categories/categoriesSlice";
import post from "../slices/posts/postSlices";
import comments from "../slices/comments/commentSlices";

const store = configureStore({
  reducer: {
    users: usersReducer,
    categories: categoriesReducer,
    post: post,
    comments: comments,
  },
});

export default store;
