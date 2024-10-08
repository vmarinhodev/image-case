import { z } from "zod";
import { loginSchema } from "../schemas/schemas";


export type LoginFormFieldsProps = {
    fieldName: keyof z.infer<typeof loginSchema>;
    fieldType: 'text' | 'email' | 'password';
    placeholder: string;
};