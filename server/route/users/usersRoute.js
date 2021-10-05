const express = require("express");
const {
  userRegController,
  loginUserController,
  fetchUsersController,
  deleteUserController,
  fetchUserDetailsController,
  userProfileController,
  updateProfileController,
} = require("../../controllers/users/usersController");
const authMiddleware = require("../../middleware/auth/authMiddleware");

const userRoutes = express.Router();

userRoutes.post("/register", userRegController);
userRoutes.post("/login", loginUserController);
userRoutes.get("/users", authMiddleware, fetchUsersController);
userRoutes.get("/profile/:id", authMiddleware, userProfileController);
userRoutes.put("/:id", authMiddleware, updateProfileController);
userRoutes.delete("/:id", deleteUserController);
userRoutes.get("/:id", fetchUserDetailsController);

module.exports = userRoutes;
