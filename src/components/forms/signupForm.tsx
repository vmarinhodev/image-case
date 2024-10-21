'use client';
import {SignUpValidationSchemaType, signUpSchema } from "@/schemas/formsSchema";
import React from "react";
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
import { signup } from "@/app/auth/authActions";


export default function SignupForm() {

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<SignUpValidationSchemaType>({
        resolver: zodResolver(signUpSchema)
    });

    // Form submit handler
    const onSubmit: SubmitHandler<SignUpValidationSchemaType> = (data) => {
        const formData = new FormData();
        formData.append("email", data.email);
        formData.append("display_name", data.display_name)
        formData.append("password", data.password);

        // Call the signup action with FormData
        signup(formData);
    }

    return (
        <section className="flex justify-center items-center">
            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle className="text-2xl">Sigup</CardTitle>
                    <CardDescription>
                        Enter your email to signup for an your account
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        {/* Email Input */}
                        <div>
                            <Label htmlFor="email" className="block text-sm font-medium">Email</Label>
                            <Input
                                type="email"
                                placeholder='email'
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                {...register('email')}
                            />
                            {errors.email && <p className="text-red-600 text-sm">{errors?.email.message}</p>}
                        </div>

                         {/* User Name Input */}
                         <div>
                            <Label htmlFor="display_name" className="block text-sm font-medium">User Name</Label>
                            <Input
                                type="display_name"
                                placeholder='user name'
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                {...register('display_name')}
                            />
                            {errors.display_name && <p className="text-red-600 text-sm">{errors?.display_name.message}</p>}
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
                        {/* Password Input */}
                        <div>
                            <Label htmlFor="confirmPassword" className="block text-sm font-medium"> Confirm Password</Label>
                            <Input
                                type="password"
                                placeholder='confirm Password'
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                {...register('confirmPassword')}
                            />
                            {errors.confirmPassword && <span className="text-red-600 text-sm">{errors.confirmPassword?.message}</span>}
                        </div>
                        {/* Submit Button */}
                        <div>
                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg"
                            >
                             {isSubmitting ? 'Signing up...' : 'Sign up'}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </section>
    );
};