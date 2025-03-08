const userRouter = require("./userRoute");
const authRouter = require("./authRoute");
const initRoutes = (app) => {
  app.use("/api/user", userRouter);
  app.use("/api/auth", authRouter);
};

module.exports = initRoutes;
