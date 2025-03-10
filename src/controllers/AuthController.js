const User = require("../models/users");
const authService = require("../services/authService");
const { sendEmail } = require("../services/sendEmailService");
const { generateOtp } = require("../utils/OtpGenerator");
const otpService = require("../services/otpService");

const signUp = async (req, res) => {
  try {
    const result = await authService.signUp(req.body);
    await otpService.createOtpSession(result.email, req.session);

    return res.status(201).json({
      success: true,
      message: "Sign up successfully, please check your email",
      email: result.email,
      token: result.token,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const signIn = async (req, res) => {
  try {
    const { email, token } = await authService.signIn(
      req.body.email,
      req.body.password
    );
    return res.status(200).json({
      success: true,
      message: "Sign in successfully",
      email: email,
      token: token,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const logout = async (req, res) => {
  try {
    await authService.logout(req.user, req.token);
    return res.status(200).json({
      success: true,
      message: "Logout successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const verifyAccount = async (req, res) => {
  try {
    const { email, otp } = req.body;
    await authService.verifyAccount(email, otp, req.session);

    return res.status(200).json({
      success: true,
      message: "Account verified successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const resendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    await authService.checkUser(email);

    await otpService.createOtpSession(email, req.session);

    return res.status(200).json({
      success: true,
      message: "OTP sent successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    await authService.checkUser(email);

    await otpService.createOtpSession(email, req.session);

    return res.status(200).json({
      success: true,
      message: "OTP sent successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const verifyPassword = async (req, res) => {
  try {
    const { email, otp } = req.body;
    await authService.verifyPassword(email, otp, req.session);

    return res.status(200).json({
      success: true,
      message: "OTP verified successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { email, password } = req.body;
    await authService.resetPassword(email, password);

    return res.status(200).json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  signUp,
  signIn,
  logout,
  verifyAccount,
  resendOtp,
  forgotPassword,
  verifyPassword,
  resetPassword,
};
