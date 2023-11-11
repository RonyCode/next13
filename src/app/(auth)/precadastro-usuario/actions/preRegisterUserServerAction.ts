'use server';

import { PreRegisterUserSchema } from '@/app/(auth)/precadastro-usuario/schemas/PreRegisterUserSchema';
import { zact } from 'zact/server';
import { ZodError } from 'zod';

export const validatedAction = zact(PreRegisterUserSchema)(async ({
  email
}) => {
  return { email };
});
export const preRegisterUserServerActions = async (data: FormData) => {
  try {
    const email = data.get('email') as string;
    if (!(await validatedAction({ email })))
      new Error('Email ou senha incorretos, tente novamente! 🤯');
    return await validatedAction({ email });
  } catch (error) {
    return JSON.parse(JSON.stringify(error as ZodError));
  }
};
