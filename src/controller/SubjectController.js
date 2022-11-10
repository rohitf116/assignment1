const SubjectModel = require("../model/SubjectModel");

exports.createSubject = async (req, res) => {
  const { subject } = req.body;
  const subjectCreated = await SubjectModel.create({ subject });
  res.status(200).json({ subjectCreated });
};
