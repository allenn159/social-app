const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

//create schema

const userSchema = new mongoose.Schema(
  {
    firstName: {
      // second item in required array is an error message if input is not true.
      required: [true, "First name is required"],
      type: String,
    },
    lastName: {
      required: [true, "Last name is required"],
      type: String,
    },
    profilePicture: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    },
    email: {
      required: [true, "Email is required"],
      type: String,
    },
    biography: {
      type: String,
    },
    password: {
      required: [true, "Password is required"],
      type: String,
    },
    postCount: {
      type: Number,
      default: 0,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: ["Admin", "Guest", "Member"],
    },
    isFollowing: {
      type: Boolean,
      default: false,
    },
    isUnFollowing: {
      type: Boolean,
      default: false,
    },
    isAccountVerified: {
      type: Boolean,
      default: false,
    },
    accountVerificationToken: String,
    accountVerificationTokenExpires: Date,
    // For data association. This is how we can relate information between multiple users. Referencing is important here.
    // Instead of pushing each individual user object into the type array, you can just pass a reference.
    viewedBy: {
      type: [
        {
          // This is technically not a real object. It is a virtual property.
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      ],
    },
    followers: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      ],
    },
    following: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      ],
    },
    passwordChangeAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,

    active: {
      type: Boolean,
      default: false,
    },
  },
  {
    // These are the second arguments in the schema.
    // These are used to tell mongoose to populate the actual id of the user from the references array shown above.
    toJSON: {
      virtuals: true,
    },
    toObjects: {
      virtuals: true,
    },
    timestamps: true,
  }
);

// Virtual method to populate user posts.
userSchema.virtual("posts", {
  // Referencing to the Post model.
  ref: "Post",
  // User is being referenced from the Post model as well.
  foreignField: "user",
  localField: "_id",
});

// Hash password
// Mongoose function
// Don't use arrow function due to the behavior of the "this" keyword.
// Need to call next due to it being middleware

userSchema.pre("save", async function (next) {
  // Check to see if password was changed. This essentially prevents a re-hash.
  // isModified is a mongoose method.
  if (!this.isModified("password")) {
    next();
  }
  // hash password
  // The asynchronous approach is recommended because hashing is CPU intensive

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

//Compare passwords
// Append our own method
// This method takes in the password as an argument and compares it with the schemaModel and login credentials from the user.
// this.password points to the hashed password in our database.
userSchema.methods.isPasswordMatching = async function (pw) {
  return await bcrypt.compare(pw, this.password);
};

// Verify account
userSchema.methods.createVerfificationToken = async function () {
  // create a token
  // these are node methods.
  const verificationToken = crypto.randomBytes(32).toString("hex");
  this.accountVerificationToken = crypto
    .createHash("sha256")
    .update(verificationToken)
    .digest("hex");

  // token expires in ten minutes
  this.accountVerificationTokenExpires = Date.now() + 30 * 60 * 1000;

  return verificationToken;
};

//Password reset/forget token

userSchema.methods.createPasswordResetToken = async function () {
  // create a token
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  //token expires in ten minutes
  this.passwordResetExpires = Date.now() + 30 * 60 * 1000;

  return resetToken;
};

// Compile schema into model

const User = mongoose.model("User", userSchema);

module.exports = User;
