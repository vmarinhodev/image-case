import { z } from "zod";

export const signUpSchema = z.object({
    // username: z.string().min(3, {message: 'Username must be at least 3 characters'}),
    email: z.string().min(1, {message: 'Email is required'}).email('Invalid email address'),
    display_name: z.string().min(4, {message: 'Username must be at least 4 characters'}),
    password: z.string().min(6, {message: 'Password must be at least 6 characters'}),
    confirmPassword: z.string().min(6, {message: 'Password must be at least 6 characters'})
  }).refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords does not match'
  })

  export type SignUpValidationSchemaType = z.infer<typeof signUpSchema>;

  export const loginSchema = z.object({
    email: z.string().min(1, {message: 'Email is required'}).email('Invalid email address'),
    password: z.string().min(6, {message: 'Password must be at least 6 characters'}),
  })

  export type LoginValidationSchemaType = z.infer<typeof loginSchema>;