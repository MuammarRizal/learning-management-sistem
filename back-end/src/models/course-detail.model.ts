import mongoose from "mongoose";
import coursesModel from "./courses.model";

const courseDetailModel = new mongoose.Schema(
  {
    title: { type: String, required: true },
    type: {
      type: String,
      enum: ["video", "text", "video-text"],
      default: "video",
    },
    youtubeId: String,
    text: String,
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
  },
  {
    timestamps: true,
  }
);

courseDetailModel.post("findOneAndDelete", async (doc) => {
  if (doc) {
    await coursesModel.findByIdAndUpdate(doc.course, {
      $pull: {
        details: doc._id,
      },
    });
  }
});

export default mongoose.model("Course-Detail", courseDetailModel);
