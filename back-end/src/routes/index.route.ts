import { NextFunction, Request, Response, Router } from "express";
import HelloWorld from "../controllers/global.controller";
import { validateRequest } from "../middlewares/validateRequest.middleware";
import { exampleSchema } from "../utils/schema.zod";

const router = Router();

router.get("/hello", HelloWorld)
router.post("/validate", validateRequest(exampleSchema), (req: Request, res: Response,next: NextFunction) => {
    res.send({message: "Get Data success"})
})


export default router