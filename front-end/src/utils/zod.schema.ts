import { z } from "zod";

export const signUpSchema = z.object({
  name: z.string().min(5, "Name must be at least 5 characters"),
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z.string().min(5, "Password must be at least 5 characters"),
});

export const signInSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z.string().min(5, "Password must be at least 5 characters"),
});

export const createCourseSchema = z.object({
  name: z.string().min(5),
  categoryId: z.string().min(5),
  tagline: z.string().min(5),
  description: z.string().min(10),
  thumbnail: z.any().refine((file) => file?.name, { message: "Thumbnail Is Required" }),
});

export const updateCourseSchema = z.object({
  name: z.string().min(5),
  categoryId: z.string().min(5),
  tagline: z.string().min(5),
  description: z.string().min(10),
});
