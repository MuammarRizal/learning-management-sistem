import { Request, Response } from "express";
import coursesModel from "../models/courses.model";
import courseDetailModel from "../models/course-detail.model";

export const postContentCourse = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    console.log(body);

    const course = await coursesModel.findById(body.courseId);

    if (!course) {
      return res.json({
        message: "Course Not Found",
      });
    }
    const content = new courseDetailModel({
      title: body.title,
      type: body.type,
      course: course._id,
      text: body.text,
      youtubeId: body.youtubeId,
    });

    await content.save();

    await coursesModel.findByIdAndUpdate(
      course?._id,
      {
        $push: {
          details: content._id,
        },
      },
      { new: true }
    );

    return res.json({ message: "Create Content Success" });
  } catch (error) {
    console.error("Error creating content course:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const updateContentCourse = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const { id } = req.params;

    const course = await coursesModel.findById(body.courseId);

    if (!course) {
      return res.json({
        message: "Course Not Found",
      });
    }

    const updateCourse = await courseDetailModel.findByIdAndUpdate(
      id,
      {
        title: body.title,
        type: body.type,
        course: course._id,
        text: body.text,
        youtubeId: body.youtubeId,
      },
      { new: true }
    );

    return res.json({ message: "Update Content Success", data: updateCourse });
  } catch (error) {
    console.error("Error creating content course:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const deleteContentCourse = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const data = await courseDetailModel.findByIdAndDelete(id);

    return res.json({
      message: "Delete Content Success",
      data_delete: data,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
