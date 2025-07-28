import mongoose from "mongoose";
const coursesModel = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  thumbnail: { type: String, required: true },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  tagline: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  students: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  manager: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  details: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CourseModel",
  },
});

export default mongoose.model("Course", coursesModel);
