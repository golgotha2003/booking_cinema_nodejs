const User = require("../models/users");
const UserService = require("../services/userService");

const getAllUsers = async (req, res) => {
  try {
    const users = await UserService.getAllUsers();

    if (users.length === 0) {
      return res.status(200).json({
        success: false,
        message: "No users found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Users retrieved successfully",
      users: users,
    });
  } catch (e) {
    res.status(500).json({
      message: "Internal Server Error",
      error: e.message,
    });
  }
};

const getCurrent = async(req, res) => {
  try {
    const {id} = req.params._id;
    const user = await UserService.getCurrent(id);

    if (user === null) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User retrieved successfully",
    });
  } catch (e) {
    res.status(500).json({
      message: "Internal Server Error",
      error: e.message,
    });
  }
};

module.exports = {getAllUsers, getCurrent};