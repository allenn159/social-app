const User = require("../../model/user/User");
const expressAsyncHandler = require("express-async-handler");
const generateToken = require("../../config/token/generateToken");
const validateMongodbID = require("../../utils/validateMongodbID");

//expressAsyncHandler saves yo fromu writing your own try/catch for async/await and passes error on to next.

//--------------------------------
// Register
//--------------------------------
const userRegController = expressAsyncHandler(async (req, res) => {
  // Check if user exists with the email address
  const userExists = await User.findOne({ email: req?.body?.email });
  // Throw an error for user to see.
  if (userExists) throw new Error("User already exists with current email");

  try {
    // Register User
    const user = await User.create({
      firstName: req?.body?.firstName,
      lastName: req?.body?.lastName,
      email: req?.body?.email,
      password: req?.body?.password,
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
  const { email, password } = req.body;
  //check if user exists in database
  const userFound = await User.findOne({ email });
  //check if password is matching
  // the isPasswordMatching function is a method from the user model.
  if (userFound && (await userFound.isPasswordMatching(password))) {
    // this is where you generate the token
    res.json({
      _id: userFound?._id,
      firstName: userFound?.firstName,
      lastName: userFound?.lastName,
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

const deleteUserController = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  // check if user id is valid
  validateMongodbID(id);
  try {
    const deletedUser = await User.findByIdAndDelete(id);
    res.json(deletedUser);
  } catch (error) {
    res.send(error);
  }
});

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
// User profile - This is for the user who is logged in. This controller will be validated.
//--------------------------------

const userProfileController = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  validateMongodbID(id);
  try {
    const myProfile = await User.findById(id);
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
      firstName: req?.body?.firstName,
      lastName: req?.body?.lastName,
      email: req?.body?.email,
      bio: req?.body?.bio,
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

const updateUserPasswordController = expressAsyncHandler(async (req, res) => {
  const { id } = req.user;
  const { password } = req.body;
  validateMongodbID(id);
  // Find user by ID first.
  const user = await User.findById(id);

  if (password) {
    user.password = password;
    const updatedUser = await user.save();
    res.json(updatedUser);
  } else {
    res.json(user);
  }
});

module.exports = {
  userRegController,
  loginUserController,
  fetchUsersController,
  deleteUserController,
  fetchUserDetailsController,
  userProfileController,
  updateProfileController,
  updateUserPasswordController,
};
