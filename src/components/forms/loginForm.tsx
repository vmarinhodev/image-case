'use client'

import { LoginValidationSchemaType, loginSchema } from "@/schemas/formsSchema";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { emailLogin } from "@/app/auth/authActions";
import { toast } from "sonner";

export default function LoginForm() {
    const [feedback, setFeedback] = useState<string | null>(null);
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginValidationSchemaType>({
        resolver: zodResolver(loginSchema)
    });

    // Form submit handler
    const onSubmit: SubmitHandler<LoginValidationSchemaType> = async (data) => {
        const formData = new FormData();
        formData.append("email", data.email);
        formData.append("password", data.password);

        // Call the login action with FormData
        const response = await emailLogin(formData);
 
        if (!response.success) {
            setFeedback(response.message);
            toast.error(`${response.message}`)
        } else {
            // Perform redirect or further actions here
            toast.success(`${response.message}`)
        }
    }

    return (
        <section className="flex justify-center items-center">
            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle className="text-2xl">Login</CardTitle>
                    <CardDescription>
                        Enter your email and password to login
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        {/* Email Input */}
                        <div>
                            <Label htmlFor="email" className="block text-sm font-medium">Email</Label>
                            <Input
                                placeholder='email'
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                {...register('email')}
                            />
                            {errors.email && <p className="text-red-600 text-sm">{errors?.email.message}</p>}
                        </div>

                        {/* Password Input */}
                        <div>
                            <Label htmlFor="password" className="block text-sm font-medium">Password</Label>
                            <Input
                                type="password"
                                placeholder='password'
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                {...register('password')}
                            />
                            {errors.password && <span className="text-red-600 text-sm">{errors?.password.message}</span>}
                        </div>

                        {/* Submit Button */}
                        <div>
                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg"
                            >
                                {isSubmitting ? 'Logging in...' : 'Login'}
                            </Button>
                            {feedback && <p className="text-red-600 text-sm mt-2">{feedback}</p>}
                        </div>
                    </form>
                </CardContent>
            </Card>
        </section>
    );
};
