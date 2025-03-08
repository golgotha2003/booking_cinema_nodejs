const router = require("express").Router();
const ctrls = require("../controllers/AuthController");
const auth = require("../middleware/auth");

router.get("/me", auth, async (req, res) => {
  res.json(req.user);
});

router.use("/sign-in", ctrls.signIn);
router.use("/sign-up", ctrls.signUp);
router.use("/me/logout",auth, ctrls.logout);

module.exports = router;