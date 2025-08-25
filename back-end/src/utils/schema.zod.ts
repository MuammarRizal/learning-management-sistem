import { z } from "zod";

export const signUpSchema = z.object({
  name: z.string().min(5, "Name must be at least 5 characters"),
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z.string().min(5, "Password must be at least 5 characters"),
});

export const signInSchema = signUpSchema.omit({ name: true });

export const mutateCourseSchema = z.object({
  name: z.string().min(5),
  categoryId: z.string(),
  tagline: z.string().min(5),
  description: z.string().min(10),
});

export const mutateContentSchema = z.object({
  title: z.string().min(5),
  type: z.string(),
  courseId: z.string().min(5),
  text: z.string().optional(),
  youtubeId: z.string().optional(),
});
