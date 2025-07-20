import { Router } from "express";
import { signInSchema, signUpSchema } from "../utils/schema.zod";
import { validateRequest } from "../middlewares/validateRequest.middleware";
import { signInAction, signUpAction } from "../controllers/auth.controller";

const authRoutes = Router();

authRoutes.post("/sign-up", validateRequest(signUpSchema), signUpAction);
authRoutes.post("/sign-in", validateRequest(signInSchema), signInAction);

export default authRoutes;
