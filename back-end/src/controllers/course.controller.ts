import { Request, Response } from "express";
import coursesModel from "../models/courses.model";
import { AuthenticatedRequest } from "../types/verifyToken.type";
import { mutateCourseSchema } from "../utils/schema.zod";
import fs from "fs";
import categoryModel from "../models/category.model";
import userModel from "../models/user.model";
import path from "path";
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

    const imageUrl = process.env.WEB_APP_URL + "/uploads/courses/";

    const data = courses.map((item) => {
      return {
        ...item.toObject(),
        thumbnail_url: imageUrl + item.thumbnail,
        total_students: item.students.length,
      };
    });

    return res.json({
      message: "Get Courses Success",
      data,
    });
  } catch (error) {
    console.log({ error });
    return res.json({
      message: "Server internal error",
      error,
    });
  }
};

export const getCourseDetailById = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const { id } = req.params;
    const { preview } = req.query;

    const imageUrl = process.env.WEB_APP_URL + "/uploads/courses/";

    const detailCourse = await coursesModel
      .findById(id)
      .populate({
        path: "category",
        select: "name -_id",
      })
      .populate({
        path: "details",
        select: preview == "true" ? "title type youtubeId text" : "title type",
      });

    if (!detailCourse) {
      return res.json({
        message: "Get Detail courses failed, data Not Found",
      });
    }
    return res.json({
      message: "Get Detail data Success",
      data: {
        ...detailCourse.toObject(),
        thumbnail: imageUrl + detailCourse.thumbnail,
      },
    });
  } catch (error) {
    console.log("Internal server Error");
    return res.json({
      message: "Server internal error",
      error,
    });
  }
};

export const postCourse = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const body = req.body;

    const validation = mutateCourseSchema.safeParse(body);

    if (!validation.success) {
      const errorMessages = validation.error.issues.map((err) => err.message);

      if (req.file?.path && fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }

      return res.status(400).json({
        message: "Validation error",
        data: null,
        errors: errorMessages,
      });
    }

    const { name, categoryId, tagline, description } = validation.data;

    // ✅ Cek apakah kategori ada
    const category = await categoryModel.findById(categoryId);
    if (!category) {
      return res.status(404).json({
        message: "Category ID not found",
      });
    }

    // ✅ Simpan course baru
    const course = new coursesModel({
      name,
      category: category._id,
      tagline,
      description,
      thumbnail: req.file?.filename,
      manager: req.user?._id,
    });

    await course.save();

    await categoryModel.findByIdAndUpdate(
      category._id,
      {
        $push: {
          courses: course.id,
        },
      },
      {
        new: true,
      }
    );

    await userModel.findByIdAndUpdate(
      req.user?._id,
      {
        $push: {
          courses: course._id,
        },
      },
      {
        new: true,
      }
    );

    return res.status(201).json({
      message: "Course created successfully",
      data: course,
    });
  } catch (err) {
    console.error("Error creating course:", err);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const updateCourse = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const body = req.body;
    const courseId = req.params.id;

    const validation = mutateCourseSchema.safeParse(body);

    if (!validation.success) {
      const errorMessages = validation.error.issues.map((err) => err.message);

      if (req.file?.path && fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }

      return res.status(400).json({
        message: "Validation error",
        data: null,
        errors: errorMessages,
      });
    }

    const { name, categoryId, tagline, description } = validation.data;

    // ✅ Cek apakah kategori ada
    const category = await categoryModel.findById(categoryId);
    const oldCourse = await coursesModel.findById(courseId);

    if (!category) {
      return res.status(404).json({
        message: "Category ID not found",
      });
    }

    if (!req.user || !req.user._id) {
      return res.status(401).json({
        message: "User not found",
      });
    }

    const data = await coursesModel.findByIdAndUpdate(
      courseId,
      {
        name: name,
        category: categoryId,
        description: description,
        tagline: tagline,
        thumbnail: req?.file ? req.file?.filename : oldCourse?.thumbnail,
        manager: req.user._id,
      },
      {
        new: true,
      }
    );

    if (!data) {
      return res.status(404).json({ message: "Course not found" });
    }
    // ✅ Simpan course baru
    if (req.file && oldCourse?.thumbnail) {
      const oldPath = `${__dirname}/../../public/uploads/courses/${oldCourse.thumbnail}`;
      if (fs.existsSync(oldPath)) {
        fs.unlinkSync(oldPath);
      }
    }

    return res.status(201).json({
      message: "Update Course successfully",
      data,
    });
  } catch (err) {
    console.error("Error creating course:", err);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const deleteCourse = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const { id } = req.params;

    const course = await coursesModel.findById(id);

    if (!course) {
      return res.status(404).json({
        message: "Course Is Not Found",
      });
    }
    const filePath = path.join(
      __dirname,
      "..",
      "..",
      "public/uploads/courses",
      course.thumbnail
    );

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    await coursesModel.findByIdAndDelete(id);

    return res.status(200).json({
      message: "Delete Course Success",
      id,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
      error,
    });
  }
};
