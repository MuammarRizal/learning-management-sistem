import { Router } from "express";
import { signUpSchema } from "../utils/schema.zod";
import { validateRequest } from "../middlewares/validateRequest.middleware";
import { signUpAction } from "../controllers/auth.controller";

const authRoutes = Router()

authRoutes.post("/sign-up", validateRequest(signUpSchema), signUpAction)

export default authRoutes