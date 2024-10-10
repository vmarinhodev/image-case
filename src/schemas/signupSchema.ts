import { z } from "zod";

// export const signupSchema = z.object({
//     email: 
//         z.string()
//         .min(1, 'Email is required')
//         .email('Please enter a valide email address'),
//     password: z
//         .string()
//         .min(1, 'Password is required')
//         .min(6, { message: 'Password must be at least 6 characters' })
// })

// export type SignupData = z.infer<typeof signupSchema>;

// export const signupSchema = z.object({

export const signupSchema = z.object({
    // username: z.string().min(3, {message: 'Username must be at least 3 characters'}),
    email: z.string().min(1, {message: 'Email is required'}).email('Invalid email address'),
    password: z.string().min(6, {message: 'Password must be at least 6 characters'}),
    confirmPassword: z.string().min(6, {message: 'Password must be at least 6 characters'})
  }).refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords does not match'
  })

  export type ValidationSchemaType = z.infer<typeof signupSchema>;