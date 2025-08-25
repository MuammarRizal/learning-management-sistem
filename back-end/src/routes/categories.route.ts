import { verifyToken } from "./../middlewares/verifyToken.middleware";
import { Router } from "express";
import { getAllCategory } from "../controllers/categories.controller";

const categoriesRoutes = Router();

categoriesRoutes.get("/categories", verifyToken, getAllCategory);

export default categoriesRoutes;
