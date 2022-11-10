const dotenv = require("dotenv");
const express = require("express");
const { connect } = require("mongoose");
const cookieParser = require("cookie-parser");
const router = require("./src/routes/routes.js");
const app = express();
app.use(express.json());
app.use(cookieParser());
dotenv.config();
app.use("/", router);
connect(
  "mongodb+srv://rohit_sonawane:SuperSu@cluster0.e9hjfiy.mongodb.net/assignment1"
)
  .then(() => {
    console.log("mongoDB connected");
  })
  .catch((er) => console.log(er));
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`running on port ${port}`);
});
