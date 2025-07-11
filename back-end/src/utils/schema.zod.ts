import { z } from "zod";

export const exampleSchema = z.object({
    name: z.string().min(3)
})

export const signUpSchema = z.object({
    name: z.string().min(5, "Name must be at least 5 characters"),
    email: z.string().min(1, "Email is required").email("Invalid email"),
    password: z.string().min(5, "Password must be at least 5 characters")
});