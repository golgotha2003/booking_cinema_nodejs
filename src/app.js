const express = require("express");
const cors = require("cors");
const app = express();
const morgan = require("morgan");
const dotenv = require("dotenv");
const initRoutes = require("./routes");
const dbConnect = require("./config/dbconnect");
const cookieParser = require("cookie-parser");

dotenv.config();


app.use(cors());
app.use(morgan("common"));
//app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

//CONNECT DATABASE
dbConnect();

//INIT ROUTES
initRoutes(app);

app.listen(process.env.PORT, () => {
  console.log("Server is running...");
});
