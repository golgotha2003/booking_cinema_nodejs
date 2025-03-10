const router = require("express").Router();
const ctrls = require("../controllers/AuthController");
const auth = require("../middleware/auth");

router.get("/me", auth, async (req, res) => {
  res.json(req.user);
});

router.use("/sign-in", ctrls.signIn);
router.use("/sign-up", ctrls.signUp);
router.use("/me/logout",auth, ctrls.logout);
router.use("/verify-account", ctrls.verifyAccount);
router.use("/resend-otp", ctrls.resendOtp);
router.use("/forgot-password", ctrls.forgotPassword);
router.use("/verify-password", ctrls.verifyPassword);
router.use("/reset-password", ctrls.resetPassword);

module.exports = router;