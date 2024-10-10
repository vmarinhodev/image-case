'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { supabaseServer } from '@/utils/supabase/server'

export async function emailLogin(formData: FormData) {
  const supabase = supabaseServer()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    redirect('/error')
  }
  
  revalidatePath('/', 'layout')
  redirect('/dashboard')
}

export async function signup(formData: FormData) {
  const supabase = supabaseServer()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  console.log('data', data)

  const { error } = await supabase.auth.signUp(data)

  if (error) {

    // console.log('error', error)
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/signup')
}


// On Logout
export async function signOut() {
  const supabase = supabaseServer();
  await supabase.auth.signOut();
  redirect('/signup')
}