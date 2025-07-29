import { verifyToken } from "./../middlewares/verifyToken.middleware";
import express from "express";
import { getCourses } from "../controllers/course.controller";

const courseRoutes = express.Router();

courseRoutes.get("/courses", verifyToken, getCourses);

export default courseRoutes;
