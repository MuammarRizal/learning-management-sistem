import multer, { FileFilterCallback } from "multer";
import { Request } from "express";

export const fileStorageCourse = multer.diskStorage({
  destination: (
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, destination: string) => void
  ) => {
    cb(null, "public/uploads/courses");
  },

  filename: (
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, filename: string) => void
  ) => {
    const timestamp = Date.now();
    const originalName = file.originalname.replace(/\s+/g, "-");
    const uniqueFilename = `${timestamp}-${originalName}`;
    cb(null, uniqueFilename);
  },
});

export const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: (error: Error | null, filename: string | boolean) => void
) => {
  if (
    file.mimetype === "images/jpeg" ||
    file.mimetype === "images/jpg" ||
    file.mimetype === "images/png"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
