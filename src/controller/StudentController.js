const StudentModel = require("../model/StudenModel");
const SubjectModel = require("../model/SubjectModel");
const { isValid } = require("../validations/validations");
exports.createStudent = async (req, res) => {
  const { name, subject } = req.body;
  const x = Object.entries(subject);
  //   console.log(subject);
  const [key, val] = x[0];
  let ind;
  const subjectFound = await SubjectModel.findOne({ subject: key });
  if (!subjectFound) {
    return res.status(400).json({ status: false, msg: "no subject" });
  }
  console.log(subjectFound, "++++++++++++++++++++++++");
  const nameFound = await StudentModel.findOne({ name });
  console.log(
    nameFound,
    "+--------------------+++++++++++++++++++++++--------------"
  );
  if (nameFound) {
    const existHere = nameFound.subjects;
    const subjectIsAlreadyAdded = existHere.some((ele, index) => {
      ind = index;
      return ele.subject === key;
    });

    if (subjectIsAlreadyAdded) {
      const currentMars = nameFound.subjects[ind];
      const newarr = nameFound.subjects;
      newarr[ind] = currentMars;
      currentMars.marks += val;
      console.log(currentMars, "currentMars");
      console.log(nameFound.subjects, "nameFound.subjects");
      const updatedStudent = await StudentModel.findOneAndUpdate(
        { name },
        {
          $set: { subjects: newarr },
        },
        { new: true }
      );
      const newSubjectList = subjectFound.student.filter((ele) => {
        return ele.name !== name;
      });
      const newObj = {
        name,
        marks: currentMars.marks,
      };
      newSubjectList.push(newObj);
      const sss = await SubjectModel.findOneAndUpdate(
        { subject: key },
        {
          $set: { student: newSubjectList },
        }
      );
      return res.status(400).json({ status: false, msg: updatedStudent });
    }
    const obj = {
      subject: key,
      marks: val,
    };
    console.log(obj, "obj");
    const newArr = nameFound.subjects;
    newArr.push(obj);
    console.log(newArr, "newArr", nameFound, "nameFound", "62");
    const updatedStudent = await StudentModel.findOneAndUpdate(
      { name },
      {
        $set: { subjects: newArr },
      },
      { new: true }
    );
    console.log(updatedStudent, "updatedStudent");
    return res.status(400).json({ status: false, msg: updatedStudent });
  }
  const obj = { subject: key, marks: val };
  console.log(obj, "obj");
  const createdStudent = await StudentModel.create({
    name,
    subjects: obj,
  });
  console.log(createdStudent, "createdStudent");
  const toSave = {
    name,
    marks: val,
  };
  console.log(subjectFound.student);
  const subArr = subjectFound.student;
  let curInd;
  const currentUser = subArr.find((ele, index) => {
    curInd = index;
    return ele.name === name;
  });
  subArr[curInd].marks = val;
  await SubjectModel.findOneAndUpdate(
    { subject: key },
    {
      $set: { student: subArr },
    }
  );
  res.status(201).json({ createdStudent });
};

exports.getStudents = async (req, res) => {
  let { name, subject } = req.query;
  console.log(subject);
  const obj = {};
  if (name) {
    obj.name = name;
  }
  if (subject) {
    obj["subjects.subject"] = subject;
  }
  const findAllData = await StudentModel.find(obj).select({
    subjects: 1,
    name: 1,
  });
  res.status(200).json({ status: true, data: findAllData });
};

exports.updateStudent = async (req, res) => {
  const { name, subject, marks } = req.body;
  console.log(name, "namammama");
  if (!isValid(name)) {
    return res.status(400).json({ status: false, msg: "please provide name" });
  }
  if (!isValid(subject)) {
    return res
      .status(400)
      .json({ status: false, msg: "please provide subject" });
  }
  let foundUser = await StudentModel.findOne({ name });
  if (!foundUser) {
    return res.status(400).json({ status: false, msg: "user not found" });
  }
  const foundSubject = await StudentModel.findOne({
    name,
    "subjects.subject": subject,
  });
  if (!foundSubject) {
    return res.status(400).json({ status: false, msg: "subject not found" });
  }
  let yyy = foundUser.toObject();
  console.log(yyy, "yyyyyyyyyyyyyyyyyyyyyyyyyyyy");
  const existHere = yyy.subjects;
  let ind;
  const subjectIsAlreadyAdded = existHere.some((ele, index) => {
    ind = index;
    return ele.subject === subject;
  });
  const obj = {
    subject: subject,
    marks,
  };
  data = existHere;
  const newx = existHere.slice(ind, 1);
  console.log(newx);
  console.log(newx, " existHere[ind]");
  console.log(existHere, " existHere[ind]");
  existHere[ind].marks = marks;
  console.log(existHere, "eddddddddddddddddddddddddddddddddddd");
  const userUpdated = await StudentModel.findOne(
    { name },
    { $set: { subjects: existHere } },
    { new: true }
  );
  res.status(200).json({ userUpdated });
};
