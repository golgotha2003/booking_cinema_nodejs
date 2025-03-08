const User = require("../models/users");

const getAllUsers = async (page = 1, limit = 10) => {
  const skip = (page - 1) * limit;
  return await User.find().select("-password").skip(skip).limit(limit);
};

const getCurrent = async (id) => {
  return await User.findById(id).select("-password");
};

module.exports = { getAllUsers, getCurrent };
