import { Request, Response } from "express";
import coursesModel from "../models/courses.model";
import { AuthenticatedRequest } from "../types/verifyToken.type";
import { mutateCourseSchema } from "../utils/schema.zod";
import fs from "fs";
import categoryModel from "../models/category.model";
import userModel from "../models/user.model";
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

export const postCourse = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const body = req.body;

    // ✅ Validasi input menggunakan Zod
    const validation = mutateCourseSchema.safeParse(body);

    if (!validation.success) {
      const errorMessages = validation.error.issues.map((err) => err.message);

      // 🧹 Hapus file yang sudah ter-upload jika validasi gagal
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
