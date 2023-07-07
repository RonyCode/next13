'use server';

import { revalidatePath } from 'next/cache';

import { SignInSchema } from '@/app/(auth)/login/schemas/SignInSchema';
import { zact } from 'zact/server';
import { ZodError } from 'zod';

export const validatedAction = zact(SignInSchema)(async ({ email, senha }) => {
  return { email, senha };
});

export const signInServerActions = async (data: FormData) => {
  try {
    const email = data.get('email') as string;
    const senha = data.get('senha') as string;
    if (!(await validatedAction({ email, senha })))
      new Error('Email ou senha incorretos, tente novamente! 🤯');
    return await validatedAction({ email, senha });
  } catch (error) {
    return JSON.parse(JSON.stringify(error as ZodError));
  }
};
