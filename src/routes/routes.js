const express = require("express");

const router = express.Router();

const { createTeacher, login } = require("../controller/TeacherController");
const { createSubject } = require("../controller/SubjectController");
const {
  createStudent,
  getStudents,
  updateStudent,
} = require("../controller/StudentController");
router.post("/teacher", createTeacher);
router.post("/login", login);
router.post("/student", createStudent);
router.post("/subject", createSubject);
router.get("/", getStudents);
router.patch("/", updateStudent);
module.exports = router;
