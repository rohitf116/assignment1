const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
exports.authenticate = (req, res, next) => {
  const token = req.cookies.access_token;
  console.log(req.cookies.access_token);
  if (!token)
    return res
      .status(401)
      .json({ status: false, message: "You are not authenticated" });
  jwt.verify(token, process.env.PRIVATE_KEY, (err, res) => {
    if (err) {
      return res.status(403).json({ status: false, message: "Invalid tokens" });
    }
    next();
  });
};
