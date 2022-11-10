const TeacherModel = require("../model/teacherModel.js");
const jwt = require("jsonwebtoken");
const { isValidObjectId } = require("mongoose");
const cookie = require("cookie-parser");
const dotenv = require("dotenv");
const {
  isValid,
  isNameValid,
  isEmailValid,
} = require("../validations/validations");
dotenv.config();
exports.createTeacher = async (req, res) => {
  const { name, email, password } = req.body;
  if (!Object.keys(req.body).length) {
    return res
      .status(400)
      .json({ status: false, message: "body cannot be empty" });
  }
  if (!isValid(name)) {
    return res
      .status(400)
      .json({ status: false, message: "name cannot be empty" });
  }
  if (!isNameValid(name)) {
    return res.status(400).json({ status: false, message: "name is invalid" });
  }
  if (!isValid(email)) {
    return res
      .status(400)
      .json({ status: false, message: "email cannot be empty" });
  }
  if (!isEmailValid(email)) {
    return res.status(400).json({ status: false, message: "email is invalid" });
  }
  console.log(email);
  const foundEmail = await TeacherModel.findOne({ email });
  if (foundEmail) {
    return res
      .status(400)
      .json({ status: false, message: "this email is already being used" });
  }
  if (!isValid(password)) {
    return res
      .status(400)
      .json({ status: false, message: "password cannot be empty" });
  }
  const createdTeacher = await TeacherModel.create({ name, password, email });
  const { password: other, ...rest } = createdTeacher._doc;
  res
    .status(201)
    .json({ status: true, message: "teacher created", Data: rest });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!Object.keys(req.body).length) {
    return res
      .status(400)
      .json({ status: false, message: "body cannot be empty" });
  }
  if (!isValid(email)) {
    return res
      .status(400)
      .json({ status: false, message: "email cannot be empty" });
  }
  if (!isValid(password)) {
    return res
      .status(400)
      .json({ status: false, message: "password cannot be empty" });
  }
  const foundUser = await TeacherModel.findOne({ email, password });
  if (!foundUser) {
    return res
      .status(400)
      .json({ status: false, message: "email or password is incorrect" });
  }
  const token = jwt.sign({ userId: foundUser.id }, process.env.PRIVATE_KEY);
  res
    .cookie("access_token", token, {
      httpOnly: true,
    })
    .status(200)
    .json({ status: true, message: "user lgged in", token });
};
