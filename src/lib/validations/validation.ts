import { z } from 'zod';

export const signUpFormSchema = <T extends z.ZodTypeAny>(
    schema: T,
    formData: z.infer<T>
) => {
    const validation = schema.safeParse(formData);
    if (!validation.success) {
        const errors = validation.error.flatten().fieldErrors;
        return { errors, data: null };
    }
    return { errors: null, data: validation.data };
}