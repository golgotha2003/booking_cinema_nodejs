const express = require("express");
const cors = require("cors");
const app = express();
const morgan = require("morgan");
const dotenv = require("dotenv");
const initRoutes = require("./routes");
const dbConnect = require("./config/dbconnect");
const cookieParser = require("cookie-parser");
const session = require("express-session");

dotenv.config();

app.use(cors());
app.use(morgan("common"));
app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
      maxAge: 300000, // 5 minutes
    },
  })
);

//CONNECT DATABASE
dbConnect();

//INIT ROUTES
initRoutes(app);

app.get("/test-session", (req, res) => {
  if (!req.session) {
    return res.status(500).json({ success: false, message: "Session chưa hoạt động!" });
  }

  req.session.test = "Hello Session!";
  res.json({ success: true, message: "Session hoạt động!", session: req.session });
});

app.listen(process.env.PORT, () => {
  console.log("Server is running...");
});
