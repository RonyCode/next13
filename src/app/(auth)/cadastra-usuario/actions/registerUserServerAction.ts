'use server';

import { RegisterUserSchema } from '@/app/(auth)/cadastra-usuario/schemas/RegisterUserSchema';
import { zact } from 'zact/server';
import { ZodError } from 'zod';

export const validatedAction = zact(RegisterUserSchema)(async ({
  email,
  nome,
  senha
}) => {
  return { email, nome, senha };
});
export const registerUserServerActions = async (data: FormData) => {
  try {
    const email = data.get('email') as string;
    const nome = data.get('nome') as string;
    const senha = data.get('senha') as string;
    if (
      !(await validatedAction({
        email,
        nome,
        senha
      }))
    )
      new Error('Email ou senha incorretos, tente novamente! 🤯');
    return await validatedAction({
      email,
      nome,
      senha
    });
  } catch (error) {
    return JSON.parse(JSON.stringify(error as ZodError));
  }
};
