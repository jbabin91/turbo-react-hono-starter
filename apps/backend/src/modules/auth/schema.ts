import { z } from 'zod';

export const signInSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email'),
  password: z.string().min(1, 'Password is required'),
});

export const signUpSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email'),
  firstName: z.string().min(1, 'First Name is required'),
  lastName: z.string().min(1, 'Last Name is required'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(8, 'Password must be at least 8 characters'),
});

export const emailExistsSchema = z.object({
  exists: z.boolean(),
});
