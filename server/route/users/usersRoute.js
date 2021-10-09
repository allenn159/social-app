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
  blockUserController,
  unblockUserController,
  generateVerificationTokenController,
  accountVerificationController,
} = require("../../controllers/users/usersController");
const authMiddleware = require("../../middleware/auth/authMiddleware");

const userRoutes = express.Router();

userRoutes.post("/register", userRegController);
userRoutes.post("/login", loginUserController);
userRoutes.get("/", authMiddleware, fetchUsersController);
userRoutes.put("/password", authMiddleware, updateUserPasswordController);
userRoutes.get("/profile/:id", authMiddleware, userProfileController);
userRoutes.put("/follow", authMiddleware, followUserController);
userRoutes.put("/unfollow", authMiddleware, unfollowUserController);
userRoutes.post(
  "/generate-verification-email-token",
  authMiddleware,
  generateVerificationTokenController
);
userRoutes.put(
  "/verify-account",
  authMiddleware,
  accountVerificationController
);
userRoutes.put("/block-user/:id", authMiddleware, blockUserController);
userRoutes.put("/unblock-user/:id", authMiddleware, unblockUserController);
userRoutes.put("/:id", authMiddleware, updateProfileController);
userRoutes.delete("/:id", deleteUserController);
userRoutes.get("/:id", fetchUserDetailsController);

module.exports = userRoutes;
