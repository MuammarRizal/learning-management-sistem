import { getCourseDetailById } from "./../controllers/course.controller";
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
import {
  postContentCourse,
  updateContentCourse,
} from "../controllers/content.controller";
import { validateRequest } from "../middlewares/validateRequest.middleware";
import { mutateContentSchema } from "../utils/schema.zod";

const courseRoutes = express.Router();

const upload = multer({
  storage: fileStorageCourse,
  fileFilter,
});

courseRoutes.get("/courses", verifyToken, getCourses);

courseRoutes.get(
  "/courses/:id",
  verifyToken,
  upload.single("thumbnail"),
  getCourseDetailById
);

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

courseRoutes.post(
  "/courses/contents",
  verifyToken,
  validateRequest(mutateContentSchema),
  postContentCourse
);

courseRoutes.post(
  "/courses/contents/:id",
  verifyToken,
  validateRequest(mutateContentSchema),
  updateContentCourse
);

export default courseRoutes;
