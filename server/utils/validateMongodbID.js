const mongoose = require("mongoose");

// Check to see if value being passed through is a valid MongoDB ID.
const validateMongodbID = (id) => {
  const isValidID = mongoose.Types.ObjectId.isValid(id);
  if (!isValidID) throw new Error("User ID is not valid");
};

module.exports = validateMongodbID;
