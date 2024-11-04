import { z } from "zod";


const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
const MAX_IMAGE_SIZE = 6; //In Megabytes

const emailValidation = new RegExp(
  /^([A-Z0-9_+-]+\.?)*[A-Z0-9_+-]@([A-Z0-9][A-Z0-9-]*\.)+[A-Z]{2,}$/i
);

  // Signup Schema
  export const signUpSchema = z.object({
    // username: z.string().min(3, {message: 'Username must be at least 3 characters'}),
    email: z
      .string()
      .min(1, {message: 'Email is required'})
      .regex(emailValidation, {
        message: 'Invalid email address'
      }),
    display_name: z
      .string()
      .min(4, {message: 'Username must be at least 4 characters'}),
    password: z
      .string()
      .min(6, {message: 'Password must be at least 6 characters'}),
    confirmPassword: z
      .string()
      .min(6, {message: 'Password must be at least 6 characters'})
  }).refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords does not match'
  })

  export type SignUpValidationSchemaType = z.infer<typeof signUpSchema>;


  // Login Schema
  export const loginSchema = z.object({
    email: z
      .string()
      .min(1, {message: 'Email is required'})
      .regex(emailValidation, {
        message: 'Invalid email address'
      }),
    password: z
      .string()
      .min(6, {message: 'Password must be at least 6 characters'}),
  })

  export type LoginValidationSchemaType = z.infer<typeof loginSchema>;


  // File uploader Schema
  export const uploadSchema = z.object({
    title: z.string().min(1, 'Title is required').max(20, 'Title cannot exceed 20 characters'),
    description: z.string().min(6, {message: 'Description must be at least 6 characters'}).max(255, {message: 'Description cannot exceed 255 characters'}),
    isPublic: z.boolean(),
    image: z
    .any()
    .refine((file) => file?.size <= MAX_IMAGE_SIZE, `Max image size is 6MB.`)
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    )

  })

  export type UploadValidationSchemaType = z.infer<typeof uploadSchema>;