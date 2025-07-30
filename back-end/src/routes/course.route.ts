import { verifyToken } from "./../middlewares/verifyToken.middleware";
import express from "express";
import {
  deleteCourse,
  getCourses,
  postCourse,
  updateCourse,
} from "../controllers/course.controller";
import multer from "multer";
import { fileFilter, fileStorageCourse } from "../utils/multer";

const courseRoutes = express.Router();

const upload = multer({
  storage: fileStorageCourse,
  fileFilter,
});

courseRoutes.get("/courses", verifyToken, getCourses);
courseRoutes.post(
  "/courses",
  verifyToken,
  upload.single("thumbnail"),
  postCourse
);

courseRoutes.put(
  "/courses/:id",
  verifyToken,
  upload.single("thumbnail"),
  updateCourse
);

courseRoutes.delete(
  "/courses/:id",
  verifyToken,
  upload.single("thumbnail"),
  deleteCourse
);

export default courseRoutes;
