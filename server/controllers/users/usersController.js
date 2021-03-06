const User = require("../../model/user/User");
const expressAsyncHandler = require("express-async-handler");
const generateToken = require("../../config/token/generateToken");
const validateMongodbID = require("../../utils/validateMongodbID");
const dotenv = require("dotenv");
const sendGridMail = require("@sendgrid/mail");
const crypto = require("crypto");
const cloudinaryUploadImg = require("../../utils/cloudinary");
const fs = require("fs");

dotenv.config();

//expressAsyncHandler saves you from writing your own try/catch for async/await and passes error on to next.

sendGridMail.setApiKey(process.env.SENDGRID_API_KEY);

//--------------------------------
// Register
//--------------------------------
const userRegController = expressAsyncHandler(async (req, res) => {
  // Check if user exists with the email address
  const emailExists = await User.findOne({
    email: req?.body?.email.toLowerCase(),
  });
  const userNameExists = await User.findOne({ userName: req?.body?.userName });
  // Throw an error for user to see.
  if (emailExists) throw new Error("User already exists with entered email");
  if (userNameExists) throw new Error("User already exists with username");

  try {
    // Register User
    const user = await User.create({
      firstName: req?.body?.firstName,
      lastName: req?.body?.lastName,
      userName: req?.body?.userName,
      password: req?.body?.password,
      email: req?.body?.email.toLowerCase(),
    });
    res.json(user);
  } catch (error) {
    res.json(error);
  }
});

//--------------------------------
// Login user
//--------------------------------

const loginUserController = expressAsyncHandler(async (req, res) => {
  const { userName, password } = req.body;
  //check if user exists in database
  const userFound = await User.findOne({ userName });
  //check if password is matching
  // the isPasswordMatching function is a method from the user model.
  if (userFound && (await userFound.isPasswordMatching(password))) {
    // this is where you generate the token
    res.json({
      _id: userFound?._id,
      firstName: userFound?.firstName,
      lastName: userFound?.lastName,
      userName: userFound?.userName,
      email: userFound?.email,
      profilePicture: userFound?.profilePicture,
      isAdmin: userFound?.isAdmin,
      token: generateToken(userFound?._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Login Credentials");
  }
});

//--------------------------------
// Fetch users
//--------------------------------

const fetchUsersController = expressAsyncHandler(async (req, res) => {
  try {
    // Empty object as a parameter means return all.
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res.json(error);
  }
});

//--------------------------------
// Delete user
//--------------------------------

// const deleteUserController = expressAsyncHandler(async (req, res) => {
//   const { id } = req.params;
//   // check if user id is valid
//   validateMongodbID(id);
//   try {
//     const deletedUser = await User.findByIdAndDelete(id);
//     res.json(deletedUser);
//   } catch (error) {
//     res.send(error);
//   }
// });

//--------------------------------
// Fetch user details
//--------------------------------

const fetchUserDetailsController = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  // check if user id is valid
  validateMongodbID(id);

  try {
    const user = await User.findById(id);
    res.json(user);
  } catch (error) {
    res.json(error);
  }
});

//--------------------------------
// View user profile - This is for the user who is logged in. This controller will be validated.
// You can only view posts of other users when you're logged in.
//--------------------------------

const userProfileController = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  validateMongodbID(id);
  try {
    const myProfile = await User.findById(id).populate("posts");
    res.json(myProfile);
  } catch (error) {
    res.json(error);
  }
});

//--------------------------------
// Update profile
//--------------------------------

const updateProfileController = expressAsyncHandler(async (req, res) => {
  const { id } = req?.user;
  validateMongodbID(id);

  const user = await User.findByIdAndUpdate(
    id,
    {
      biography: req?.body?.biography,
    },
    {
      // This will only update the information that is new
      new: true,
      runValidators: true,
    }
  );
  res.json(user);
});

//--------------------------------
// Update user password
//--------------------------------

// const updateUserPasswordController = expressAsyncHandler(async (req, res) => {
//   const { id } = req.user;
//   const { password } = req.body;
//   validateMongodbID(id);
//   // Find user by ID first.
//   const user = await User.findById(id);

//   if (password) {
//     user.password = password;
//     const updatedUser = await user.save();
//     res.json(updatedUser);
//   } else {
//     res.json(user);
//   }
// });

//--------------------------------
// Follow user
//--------------------------------

const followUserController = expressAsyncHandler(async (req, res) => {
  // Find the user you want to follow and update it's followers field.
  // Update the login users following field.
  const { followId } = req.body;
  const loginUserId = req.user.id;

  //Find the target user and check if the login user id exists in the following array.

  const targetUser = await User.findById(followId);

  const alreadyFollowing = targetUser?.followers?.find(
    (user) => user?.toString() === loginUserId.toString()
  );

  if (alreadyFollowing) throw new Error("You are already following this user!");

  // Update the target user's followers array.
  await User.findByIdAndUpdate(
    followId,
    {
      $push: { followers: loginUserId },
      isFollowing: true,
    },
    { new: true }
  );

  // Update login user's following array.
  await User.findByIdAndUpdate(
    loginUserId,
    {
      $push: { following: followId },
    },
    { new: true }
  );

  res.json("You have successfully followed this user!");
});

//--------------------------------
// Unfollow user
//--------------------------------

const unfollowUserController = expressAsyncHandler(async (req, res) => {
  // Find the user you want to unfollow and update it's followers field.
  const { unfollowId } = req.body;
  const loginUserId = req.user.id;

  const targetUser = await User.findById(loginUserId);

  const notFollowing = targetUser?.following?.find(
    (user) => user?.toString() === unfollowId.toString()
  );

  if (!notFollowing) throw new Error("You are not following this user!");

  await User.findByIdAndUpdate(
    unfollowId,
    {
      // Pull removes from the followers array
      $pull: { followers: loginUserId },
      isFollowing: false,
    },
    { new: true }
  );

  await User.findByIdAndUpdate(
    loginUserId,
    {
      $pull: { following: unfollowId },
    },
    { new: true }
  );

  res.json("You have unfollowed this user!");
});

//--------------------------------
// Block user (as admin)
//--------------------------------

// const blockUserController = expressAsyncHandler(async (req, res) => {
//   const { id } = req.params;
//   validateMongodbID(id);

//   const user = await User.findByIdAndUpdate(
//     id,
//     {
//       isBlocked: true,
//     },
//     { new: true }
//   );
//   res.json(user);
// });

//--------------------------------
// Unblock user (as admin)
//--------------------------------

// const unblockUserController = expressAsyncHandler(async (req, res) => {
//   const { id } = req.params;
//   validateMongodbID(id);

//   const user = await User.findByIdAndUpdate(
//     id,
//     {
//       isBlocked: false,
//     },
//     { new: true }
//   );
//   res.json(user);
// });

//--------------------------------
// Generate account verification token (by email)
//--------------------------------

// const generateVerificationTokenController = expressAsyncHandler(
//   async (req, res) => {
//     const loginUser = req.user.id;

//     const user = await User.findById(loginUser);

//     try {
//       // Generate Token
//       const verificationToken = await user.createVerfificationToken();
//       // Save user
//       await user.save();
//       console.log(verificationToken);
//       // Build message

//       const verifyLink = `Please verify your email within the next 10 minutes, otherwise this link will expire. <a href="http://localhost:3000/verify-account/${verificationToken}">Click here to verify your account.</a>`;

//       const msg = {
//         to: "allenabbottdev@gmail.com",
//         from: "donotreplycrudapp@gmail.com",
//         subject: "My first NodeJS email",
//         html: verifyLink,
//       };

//       await sendGridMail.send(msg);
//       res.json(verifyLink);
//     } catch (error) {
//       res.json(error);
//     }
//   }
// );

//--------------------------------
// Account verification
//--------------------------------

// const accountVerificationController = expressAsyncHandler(async (req, res) => {
//   const { token } = req.body;
//   // Rehashing token again to find match in database.
//   const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

//   // Find the user by token
//   const userFound = await User.findOne({
//     accountVerificationToken: hashedToken,
//     // the gt will check to see if the current date is passed the token expiration date.
//     accountVerificationTokenExpires: { $gt: new Date() },
//   });

//   if (!userFound) throw new Error("Token expired, try again later.");

//   // Update the account verified property to true.
//   userFound.isAccountVerified = true;
//   userFound.accountVerificationToken = undefined;
//   userFound.accountVerificationTokenExpires = undefined;

//   await userFound.save();
//   res.json(userFound);
// });

//--------------------------------
// Generate forget password token
//--------------------------------

// const generateForgetPasswordTokenController = expressAsyncHandler(
//   async (req, res) => {
//     // Locate user by email.
//     const { email } = req.body;

//     const user = await User.findOne({ email });
//     if (!user) throw new Error("User not found");

//     try {
//       const token = await user.createPasswordResetToken();
//       console.log(token);
//       await user.save();

//       // Build message

//       const resetLink = `Please reset your password within the next 10 minutes, otherwise this link will expire. <a href="http://localhost:3000/reset-password/${token}">Click here to reset your password.</a>`;

//       const msg = {
//         to: email,
//         from: "donotreplycrudapp@gmail.com",
//         subject: "Reset Password",
//         html: resetLink,
//       };

//       const emailMsg = await sendGridMail.send(msg);
//       // In production never send json response with email message.
//       res.json({
//         msg: `A message was succesfully sent to ${user.email}. Please reset the password within the next 10 minutes. <a href="http://localhost:3000/reset-password/${token}">Click here to reset your password.</a>`,
//       });
//     } catch (error) {
//       res.json(error);
//     }
//   }
// );

//--------------------------------
// Password reset controller
//--------------------------------

// const passwordResetController = expressAsyncHandler(async (req, res) => {
//   const { token, password } = req.body;
//   const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

//   //Find user by the token
//   const user = await User.findOne({
//     passwordResetToken: hashedToken,
//     passwordResetExpires: { $gt: new Date() },
//   });

//   if (!user) throw new Error("Token expired");

//   // Change password
//   user.password = password;
//   user.passwordResetToken = undefined;
//   user.passwordResetExpires = undefined;
//   await user.save();
//   res.json(user);
// });

//--------------------------------
// Profile picture upload
//--------------------------------

const profilePictureUploadController = expressAsyncHandler(async (req, res) => {
  //Find the login user before uploading image.
  const { _id } = req.user;

  // Get the path to the image.
  const localPath = `public/images/profile/${req.file.fileName}`;
  // Upload to cloudinary
  const uploadedImg = await cloudinaryUploadImg(localPath);

  const user = await User.findByIdAndUpdate(
    _id,
    {
      profilePicture: uploadedImg?.url,
    },
    { new: true }
  );
  // Remove uploaded image in local file.
  fs.unlinkSync(localPath);
  res.json(user);
});

module.exports = {
  userRegController,
  loginUserController,
  fetchUsersController,
  fetchUserDetailsController,
  userProfileController,
  updateProfileController,
  followUserController,
  unfollowUserController,
  profilePictureUploadController,
};
