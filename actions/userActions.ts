'use server';

import { startTransition } from 'react';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { RegisterUserSchema } from '@/app/(auth)/cadastro-usuario/[token]/schemas/RegisterUserSchema';

import { useUserStore } from '../store/userStore';
import { UserType } from '../types';

export async function submitUserForm(formData: FormData) {
  const formaDataEntries = Object.fromEntries(formData.entries());
  const result = RegisterUserSchema.safeParse(formaDataEntries);

  if (result.success) {
    useUserStore.getState().add(result.data as UserType);
    // redirect('/dashboard');
  }

  if (!result.success) {
    console.log(result.error.formErrors.fieldErrors.nome);
  }
  revalidatePath('/');
}
