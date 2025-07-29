import { Request, Response } from "express";
import coursesModel from "../models/courses.model";
import { AuthenticatedRequest } from "../types/verifyToken.type";

export const getCourses = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const courses = await coursesModel
      .find({
        manager: req.user?._id,
      })
      .select("name thumbnail")
      .populate({
        path: "category",
        select: "name -_id",
      })
      .populate({
        path: "students",
        select: "name",
      });

    return res.json({
      message: "Get Courses Success",
      data: courses,
    });
  } catch (error) {
    console.log({ error });
    return res.json({
      message: "Server internal error",
      error,
    });
  }
};
