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

export const createContentCourseSchema = z
  .object({
    title: z.string().min(5),
    type: z.string(),
    text: z.string().optional(),
    youtubeId: z.string().optional(),
  })
  .superRefine((val, ctx) => {
    const parseVideoId = z.string().min(4).safeParse(val.youtubeId);
    const parseText = z.string().min(4).safeParse(val.text);
    if (val.type === "video") {
      if (!parseVideoId.success) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Youtube ID Required",
          path: ["youtubeId"],
        });
      }
    }

    if (val.type === "text") {
      if (!parseText.success) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Content Text Required",
          path: ["text"],
        });
      }
    }
  });

export const updateCourseSchema = z.object({
  name: z.string().min(5),
  categoryId: z.string().min(5),
  tagline: z.string().min(5),
  description: z.string().min(10),
});
