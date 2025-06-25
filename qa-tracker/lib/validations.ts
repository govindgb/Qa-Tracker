import { z } from 'zod';

export const registerSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name cannot exceed 50 characters')
    .trim(),
  email: z.string()
    .email('Invalid email format')
    .toLowerCase(),
  password: z.string()
    .min(6, 'Password must be at least 6 characters')
    .max(100, 'Password cannot exceed 100 characters'),
  role: z.enum(['admin', 'tester'], {
    errorMap: () => ({ message: 'Role must be either admin or tester' })
  })
});

export const loginSchema = z.object({
  email: z.string()
    .email('Invalid email format')
    .toLowerCase(),
  password: z.string()
    .min(1, 'Password is required')
});

export const bugSchema = z.object({
  projectName: z.string()
    .min(2, 'Project name must be at least 2 characters')
    .max(100, 'Project name cannot exceed 100 characters')
    .trim(),
  testingRound: z.number()
    .min(1, 'Testing round must be at least 1')
    .max(100, 'Testing round cannot exceed 100'),
  bugDescription: z.string()
    .min(10, 'Bug description must be at least 10 characters')
    .max(1000, 'Bug description cannot exceed 1000 characters')
    .trim(),
  feedback: z.string()
    .min(5, 'Feedback must be at least 5 characters')
    .max(500, 'Feedback cannot exceed 500 characters')
    .trim(),
  status: z.enum(['pending', 'in-progress', 'resolved', 'rejected'])
    .optional()
    .default('pending')
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type BugInput = z.infer<typeof bugSchema>;