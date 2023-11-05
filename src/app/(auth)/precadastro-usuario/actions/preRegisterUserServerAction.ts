'use server';

import { PreRegisterUserSchema } from '@/app/(auth)/precadastro-usuario/schemas/PreRegisterUserSchema';
import { zact } from 'zact/server';
import { ZodError } from 'zod';

export const validatedAction = zact(PreRegisterUserSchema)(async ({
  email,
  nome,
  senha,
  confirmaSenha,
  telefone
}) => {
  return { email, nome, senha, confirmaSenha, telefone };
});
export const registerUserServerActions = async (data: FormData) => {
  try {
    const email = data.get('email') as string;
    const nome = data.get('nome') as string;
    const senha = data.get('senha') as string;
    const confirmaSenha = data.get('confirmaSenha') as string;
    const telefone = data.get('telefone') as string;
    if (
      !(await validatedAction({
        email,
        nome,
        senha,
        confirmaSenha,
        telefone
      }))
    )
      new Error('Email ou senha incorretos, tente novamente! 🤯');
    return await validatedAction({
      email,
      nome,
      senha,
      confirmaSenha,
      telefone
    });
  } catch (error) {
    return JSON.parse(JSON.stringify(error as ZodError));
  }
};
