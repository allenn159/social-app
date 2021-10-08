const express = require("express");
const {
  userRegController,
  loginUserController,
  fetchUsersController,
  deleteUserController,
  fetchUserDetailsController,
  userProfileController,
  updateProfileController,
  updateUserPasswordController,
  followUserController,
  unfollowUserController,
} = require("../../controllers/users/usersController");
const authMiddleware = require("../../middleware/auth/authMiddleware");

const userRoutes = express.Router();

userRoutes.post("/register", userRegController);
userRoutes.post("/login", loginUserController);
userRoutes.get("/", authMiddleware, fetchUsersController);
userRoutes.put("/password", authMiddleware, updateUserPasswordController);
userRoutes.get("/profile/:id", authMiddleware, userProfileController);
userRoutes.put("/:id", authMiddleware, updateProfileController);
userRoutes.delete("/:id", deleteUserController);
userRoutes.get("/:id", fetchUserDetailsController);
userRoutes.post("/follow", authMiddleware, followUserController);
userRoutes.post("/unfollow", authMiddleware, unfollowUserController);

module.exports = userRoutes;
