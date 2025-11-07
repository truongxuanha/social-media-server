import { z } from "zod";

export const registerSchema = z.object({
  name: z
    .string({ message: "Name is string" })
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters"),

  email: z
    .string({ message: "Email is string" })
    .email("Email is not valid")
    .max(255, "Email must be less than 255 characters"),

  password: z
    .string({ message: "Password is string" })
    .min(6, "Password must be at least 6 characters")
    .max(100, "Password must be less than 100 characters"),
});

export const loginSchema = z.object({
  email: z
    .string({ message: "Email is string" })
    .email("Email is not valid")
    .max(255, "Email must be less than 255 characters"),

  password: z
    .string({ message: "Password is string" })
    .min(1, "Password is required"),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
