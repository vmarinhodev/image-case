'use client'
import { ValidationSchemaType, signupSchema } from "@/schemas/signupSchema";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { z } from "zod";

type FormErrors = z.inferFormattedError <typeof signupSchema>;

export default function SignupForm() {
    const router = useRouter(); 
    const [formData, setFormData] = useState<ValidationSchemaType>({
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [submitting, setSubmitting] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const getErrorMessage = (error: FormErrors[keyof FormErrors] | undefined): string => {
        return error && "_errors" in error && error._errors.length > 0
        ? error._errors[0]
        : "invalid input";
      };


      // handle submittion
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const parsedFormData = signupSchema.safeParse(formData);

        if (!parsedFormData.success) {
            const zodErrors = parsedFormData.error.format();
            const errorMessages: { [key: string]: string } = {};
            errorMessages.email = getErrorMessage(zodErrors.email);
            errorMessages.password = getErrorMessage(zodErrors.password);
            
            setErrors(errorMessages)
            return;
        }

        setErrors({});
        setSubmitting(true);

        setTimeout(() => {
            console.log('formsubmitted:', formData);
            router.push('/')
            setSubmitting(false)
        }, 2000);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Input */}
            <div>
                <label htmlFor="email" className="block text-sm font-medium">Email action</label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                    required
                />
                {errors.email && <p className="text-red-600 text-sm">{errors.email}</p>}
            </div>

            {/* Password Input */}
            <div>
                <label htmlFor="password" className="block text-sm font-medium">Password</label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                    required
                />
                {errors.password && <p className="text-red-600 text-sm">{errors.password}</p>}
            </div>
            {/* Submit Button */}
            <div>
                <button
                    type="submit"
                    disabled={submitting}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg"
                >
                    {submitting ? 'Signing up...' : 'Sign up'}
                </button>
            </div>
        </form>
    );
};