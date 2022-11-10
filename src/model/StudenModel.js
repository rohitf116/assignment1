const { Schema, model, Types } = require("mongoose");
const { ObjectId } = Types;
const StudenntSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    subjects: [
      {
        subject: { type: String, required: true },
        marks: { type: Number, required: true },
        _id: false,
      },
    ],
  },
  { timestamps: true }
);

module.exports = model("Student", StudenntSchema);
