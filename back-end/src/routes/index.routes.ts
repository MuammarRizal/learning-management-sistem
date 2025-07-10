import { Router } from "express";
import HelloWorld from "../controllers/global.controller";

const router = Router();

router.get("/hello", HelloWorld)

export default router