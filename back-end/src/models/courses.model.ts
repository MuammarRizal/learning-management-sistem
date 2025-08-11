import mongoose from "mongoose";
import categoryModel from "./category.model";
import courseDetailModel from "./course-detail.model";
import userModel from "./user.model";
const coursesModel = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  thumbnail: { type: String, required: true },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: categoryModel.modelName,
  },
  tagline: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  students: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: userModel.modelName,
    },
  ],
  manager: {
    type: mongoose.Schema.Types.ObjectId,
    ref: userModel.modelName,
  },
  details: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: courseDetailModel.modelName,
    },
  ],
});

coursesModel.post("findOneAndDelete", async (doc) => {
  if (doc) {
    await categoryModel.findByIdAndUpdate(doc.category, {
      $pull: {
        courses: doc._id,
      },
    });

    await courseDetailModel.deleteMany({
      course: doc._id,
    });

    doc.students?.map(async (std: any) => {
      console.log({ std });
      await userModel.findByIdAndUpdate(std._id, {
        $pull: {
          courses: doc._id,
        },
      });
    });
  }
});

export default mongoose.model("Course", coursesModel);
