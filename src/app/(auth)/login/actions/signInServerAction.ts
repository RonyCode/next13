'use server';

import { SignInSchema } from '@/app/(auth)/login/schemas/SignInSchema';
import { zact } from 'zact/server';
import { ZodError } from 'zod';

export const validatedAction = zact(SignInSchema)(async ({
  email,
  senha,
  is_user_externo
}) => {
  return { email, senha, is_user_externo };
});
export const signInServerActions = async (data: FormData) => {
  try {
    const email = data.get('email') as string;
    const senha = data.get('senha') as string;
    const is_user_externo = data.get('is_user_externo') as unknown as number;
    if (!(await validatedAction({ email, senha, is_user_externo })))
      new Error('Email ou senha incorretos, tente novamente! 🤯');
    return await validatedAction({
      email,
      senha,
      is_user_externo
    });
  } catch (error) {
    return JSON.parse(JSON.stringify(error as ZodError));
  }
};
