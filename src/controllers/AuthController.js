const User = require("../models/users");

const signUp = async (req, res) => {
  try {
    const email = req.body.email;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email đã tồn tại",
      });
    }
    const user = new User(req.body);
    await user.save();

    const token = await user.generateAuthToken();
    res.status(201).json({
      success: true,
      message: "Đăng ký thành công",
      user: user,
      token: token,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Thiếu thông tin đăng nhập",
      });
    }
    const user = await User.findByCredentials(email, password);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Sai thông tin đăng nhập",
      });
    }

    const token = await user.generateAuthToken();

    return res.status(201).json({
      success: true,
      message: "Đăng nhập thành công",
      user: user,
      token: token,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const logout = async (req, res) => {
  try {
    if (!req.user || !req.token) {
      return res.status(400).json({
        success: false,
        message: "Không có phiên đăng nhập",
      });
    }

    // Kiểm tra token có tồn tại trước khi xóa
    const tokenExists = req.user.tokens.some((token) => token.token === req.token);
    if (!tokenExists) {
      return res.status(400).json({
        success: false,
        message: "Token không hợp lệ hoặc đã đăng xuất trước đó",
      });
    }

    // Xóa token bằng Mongoose (Cách tối ưu hơn)
    await User.updateOne(
      { _id: req.user._id },
      { $pull: { tokens: { token: req.token } } } // Xóa token ra khỏi mảng
    );

    return res.status(200).json({
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

module.exports = { signUp, signIn, logout };
