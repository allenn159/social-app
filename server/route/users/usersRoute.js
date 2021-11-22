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
  generateForgetPasswordTokenController,
  passwordResetController,
  profilePictureUploadController,
} = require("../../controllers/users/usersController");
const authMiddleware = require("../../middleware/auth/authMiddleware");
const {
  pictureUpload,
  profilePictureResize,
} = require("../../middleware/uploads/pictureUpload");

const userRoutes = express.Router();

userRoutes.post("/register", userRegController);
userRoutes.post("/login", loginUserController);
userRoutes.get("/", authMiddleware, fetchUsersController);
userRoutes.put(
  "/profile-picture-upload",
  authMiddleware,
  // This is how multer looks for the image that is being uploaded.
  pictureUpload.single("image"),
  profilePictureResize,
  profilePictureUploadController
);
userRoutes.put("/password", authMiddleware, updateUserPasswordController);
userRoutes.post(
  "/forget-password-token",
  generateForgetPasswordTokenController
);
userRoutes.put("/reset-password", passwordResetController);
userRoutes.get("/profile/:id", authMiddleware, userProfileController);
userRoutes.put("/follow", authMiddleware, followUserController);
userRoutes.put("/unfollow", authMiddleware, unfollowUserController);
userRoutes.post(
  "/generate-verification-email-token",
  authMiddleware,
  generateVerificationTokenController
);
// userRoutes.put(
//   "/verify-account",
//   authMiddleware,
//   accountVerificationController
// );
userRoutes.put("/block-user/:id", authMiddleware, blockUserController);
userRoutes.put("/unblock-user/:id", authMiddleware, unblockUserController);
userRoutes.put("/update-bio", authMiddleware, updateProfileController);
userRoutes.delete("/:id", deleteUserController);
userRoutes.get("/:id", fetchUserDetailsController);

module.exports = userRoutes;
