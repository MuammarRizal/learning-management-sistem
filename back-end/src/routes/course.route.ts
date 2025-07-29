import { verifyToken } from "./../middlewares/verifyToken.middleware";
import express from "express";
import { getCourses, postCourse } from "../controllers/course.controller";
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

export default courseRoutes;
