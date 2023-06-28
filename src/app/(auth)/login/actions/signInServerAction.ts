'use server';

import { Validate } from 'react-hook-form';

import { revalidatePath } from 'next/cache';

import { SignInSchema } from '@/app/(auth)/login/schemas/SignInSchema';
import { ValidationError } from 'json-schema';
import { zact } from 'zact/server';
import { z, ZodError, ZodIssue } from 'zod';

export const validatedAction = zact(SignInSchema)(async ({ email, senha }) => {
  return { email, senha };
});

export const signInServerActions = async (data: FormData) => {
  const email = data.get('email') as string;
  const senha = data.get('senha') as string;
  await revalidatePath('/login');

  try {
    const result = await validatedAction({ email, senha });
    if (!result) new z.ZodError([]);
    return result;
  } catch (error: any) {
    const result2: SignInSchema[] = [];

    error?.details.forEach((item: ZodIssue) => {
      item.path.forEach((itemPath) => {
        if (itemPath == 'email') {
          result2.push({ senha: '', email: item.message });
        }
        if (itemPath == 'senha') {
          result2.push({ email: '', senha: item.message });
        } // console.log(error);
      });
    });
    return result2;
  }
};
