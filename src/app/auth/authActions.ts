'use server'

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { supabaseServer } from '@/utils/supabase/server';
import { loginSchema } from '@/schemas/formsSchema';

interface LoginResponse {
    success: boolean;
    message: string;
}

// Email Login Authentication
export async function emailLogin(formData: FormData): Promise<LoginResponse> {
    const supabase = supabaseServer();

    const data = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    };

    // Zod Validation
    try {
        loginSchema.parse(data);
    } catch (validationError) {
        const issues = (validationError as any).issues; // Access Zod issues
        return {
            success: false,
            message: issues.map((issue: any) => issue.message).join(", "), // Join messages
        };
    }

    const { error } = await supabase.auth.signInWithPassword(data);
    if (error) {
        return {
            success: false,
            message: error.message,
        };
    }
    revalidatePath('/', 'layout');
    return { success: true, message: 'Login successful' };
}

// SignUp Authentication
export async function signup(formData: FormData) {
  const supabase = supabaseServer()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    options: {
      data: {
        display_name: formData.get('display_name') as string,
      }
    }
  }

  const { error } = await supabase.auth.signUp(data)

  if (error) {

    console.error('error', error)
    redirect('/error')
  }

  revalidatePath('/')
  redirect('/')
}


// On Logout Authentication
export async function signOut() {
  const supabase = supabaseServer();
  await supabase.auth.signOut();
  redirect('/')
}