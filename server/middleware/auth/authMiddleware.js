const expressAsyncHandler = require("express-async-handler");

const jwt = require("jsonwebtoken");
const User = require("../../model/user/User");

// Middleware to get the token from the request header. This can be located with
// the req.headers.authorization param.
const authMiddleware = expressAsyncHandler(async (req, res, next) => {
  let token;

  if (req?.headers?.authorization?.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];
      if (token) {
        // Decode the token first with verify method from JWT
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        // Find the user by ID.
        // Use select to remove password in the response.
        const updatedUser = await User.findById(decoded?.id).select(
          "-password"
        );
        // Attach the user to the request object
        req.user = updatedUser;
        next();
      }
    } catch (error) {
      throw new Error("Not authorized. Token Expired.");
    }
  } else {
    throw new Error("There is no token attached to the header.");
  }
});

module.exports = authMiddleware;
