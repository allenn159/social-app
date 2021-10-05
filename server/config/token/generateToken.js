const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  // Sign means to generate a token and assign to a user.
  // Takes in three parameters: id, keys, and expiration.
  return jwt.sign({ id }, process.env.JWT_KEY, { expiresIn: "20d" });
};

module.exports = generateToken;
