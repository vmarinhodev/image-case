"use client";

import React from 'react';
import styles from './Form.module.scss'
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const Form = () => {

  const schema = z.object({
    username: z.string().min(3, {message: 'Username must be at least 3 characters'}),
    email: z.string().min(1, {message: 'Email is required'}).email('Invalid email address'),
    password: z.string().min(6, {message: 'Password must be at least 6 characters'}),
    confirmPassword: z.string().min(6, {message: 'Password must be at least 6 characters'})
  }).refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords does not match'
  })

  //extract the inferred type from schema
  type ValidationSchemaType = z.infer<typeof schema>

  const { register, handleSubmit, formState: { errors } } = useForm<ValidationSchemaType>({
    resolver: zodResolver(schema),
  });

  // Form submit handler
  const onSubmit: SubmitHandler<ValidationSchemaType> = (data) => {
    console.log(data)
  }

  return (
    <form className={styles.form_main} onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="username">
        Username:
        <input
          type="text"
          placeholder='username goes here...'
          {...register('username')}
          className={errors.username && styles.error_input}
        />
        {errors.username && (
          <span className={styles.error}>{errors.username?.message}</span>
        )}
      </label>
      <label htmlFor="email">
        Email:
        <input
          type="email"
          placeholder='email goes here...'
          {...register('email')} 
          className={errors.email && styles.error_input}
        />
        {errors.email && ( <span className={styles.error}>{errors.email?.message}</span> )}
      </label>


      <label htmlFor="password">
        Password:
        <input type="password" placeholder='password goes here...' {...register('password')}  className={errors.password && styles.error_input}/>
        {errors.password && (
          <span className={styles.error}>{errors.password?.message}</span>
        )}
      </label>

      <label htmlFor="confirmPassword">
        Confirm Password:
        <input type="password" placeholder='Confirm password' {...register('confirmPassword')}  className={errors.confirmPassword && styles.error_input}/>
        {errors.confirmPassword && (
          <span className={styles.error}>{errors.confirmPassword?.message}</span>
        )}
      </label>
      <button type='submit'>Login</button>
    </form>
  )
}

export default Form;