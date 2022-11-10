const { Schema, model, Types } = require("mongoose");
const { ObjectId } = Types;
const SubjectSchema = new Schema(
  {
    subject: {
      type: String,
      trim: true,
      required: true,
      //   unique: true,
    },
    student: [{ name: { type: String }, marks: { type: Number }, _id: false }],
  },
  { timestamps: true }
);

module.exports = model("Subject", SubjectSchema);
