import { NextFunction, Request, Response } from "express";
import {z, ZodError} from 'zod'

export const validateRequest = (schema: z.Schema) => async (req: Request,res: Response,next: NextFunction) => {
    try {
        schema.parse(req.body);
        next()
    } catch (error) {
        if(error instanceof ZodError) {
            const errorMessages = error.issues.map((err) => err.message)

            return res.status(500).json({error: "Invalid Request", details: errorMessages})
        }

        res.status(500).json({error: "Internal server"})
    }
}