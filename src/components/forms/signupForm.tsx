'use client'
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from 'zod';
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
import { signup } from "@/app/login/actions";

export default function SignupForm() {

    const schema = z.object({
        email: z.string().min(1, { message: 'Email is required' }).email('Invalid email address'),
        password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
        confirmPassword: z.string().min(6, { message: 'Password must be at least 6 characters' })
    }).refine((data) => data.password === data.confirmPassword, {
        path: ['confirmPassword'],
        message: 'Passwords does not match'
    })

    //extract the inferred type from schema
    type ValidationSchemaType = z.infer<typeof schema>

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ValidationSchemaType>({
        resolver: zodResolver(schema),
    });

    // Form submit handler
    const onSubmit: SubmitHandler<ValidationSchemaType> = (data) => {
        console.log(data)
       
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
                                id="email"
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
                                id="password"
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
                                id="confirmPassword"
                                placeholder='password'
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                {...register('confirmPassword')}
                            />
                            {errors.password && <span className="text-red-600 text-sm">{errors.confirmPassword?.message}</span>}
                        </div>
                        {/* Submit Button */}
                        <div>
                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg"
                                formAction={signup}
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