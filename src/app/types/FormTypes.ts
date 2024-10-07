import { z } from "zod";
import { LoginFormSchema } from "@/schemas";

export type LoginFormFieldsProps = {
    fieldName: keyof z.infer<typeof LoginFormSchema>;
    fieldType: 'text' | 'email' | 'password';
    placeholder: string;
};