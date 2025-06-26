import { z } from "zod";
 
export const registerSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name cannot exceed 50 characters")
    .trim(),
  email: z.string().email("Invalid email format").toLowerCase(),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(100, "Password cannot exceed 100 characters"),
  role: z.enum(["admin", "user"], {
    errorMap: () => ({ message: "Role must be either admin or user" }),
  }),
});
 
export const loginSchema = z.object({
  email: z.string().email("Invalid email format").toLowerCase(),
  password: z.string().min(1, "Password is required"),
});
 
export const bugSchema = z.object({
  projectName: z
    .string()
    .min(2, "Project name must be at least 2 characters")
    .max(100, "Project name cannot exceed 100 characters")
    .trim(),
  testingRound: z
    .number()
    .min(1, "Testing round must be at least 1")
    .max(100, "Testing round cannot exceed 100"),
  bug: z
    .array(
      z.object({
        bugTitle: z
          .string()
          .min(2, "Bug title must be at least 2 characters")
          .max(100, "Bug title cannot exceed 100 characters")
          .trim(),
        description: z
          .string()
          .min(10, "Description must be at least 10 characters")
          .max(1000, "Description cannot exceed 1000 characters")
          .trim(),
        priority: z.enum(["low", "medium", "high", "critical"]),
      })
    )
    .min(1, "At least one bug must be provided"),
  status: z
    .enum(["pending", "in-progress", "resolved", "rejected"])
    .optional()
    .default("pending"),
  userId: z.string().nonempty("User ID is required"),
  userName: z.string().nonempty("User name is required"),
  userEmail: z.string().email("Invalid email format"),
});
 
export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type BugInput = z.infer<typeof bugSchema>;