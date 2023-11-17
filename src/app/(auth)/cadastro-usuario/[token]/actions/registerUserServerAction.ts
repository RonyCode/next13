'use server';

import { RegisterUserSchema } from '@/app/(auth)/cadastro-usuario/[token]/schemas/RegisterUserSchema';
import { zact } from 'zact/server';
import { ZodError } from 'zod';

export const validatedAction = zact(RegisterUserSchema)(async ({
  nome,
  cpf,
  endereco,
  cidade,
  estado,
  telefone,
  fotoPerfil,
  email,
  senha,
  confirmaSenha
}) => {
  return {
    nome,
    cpf,
    endereco,
    cidade,
    estado,
    telefone,
    fotoPerfil,
    email,
    senha,
    confirmaSenha
  };
});
export const registerUserServerActions = async (data: FormData) => {
  try {
    const nome = data.get('nome') as string;
    const cpf = data.get('cpf') as string;
    const endereco = data.get('endereco') as string;
    const cidade = data.get('cidade') as string;
    const estado = data.get('estado') as string;
    const telefone = data.get('telefone') as string;
    const fotoPerfil = data.get('foto_perfil') as string;
    const email = data.get('email') as string;
    const senha = data.get('senha') as string;
    const confirmaSenha = data.get('confirma_senha') as string;
    if (
      !(await validatedAction({
        nome,
        cpf,
        endereco,
        cidade,
        estado,
        telefone,
        fotoPerfil,
        email,
        senha,
        confirmaSenha
      }))
    )
      new Error('Email ou senha incorretos, tente novamente! 🤯');
    return await validatedAction({
      nome,
      cpf,
      endereco,
      cidade,
      estado,
      telefone,
      fotoPerfil,
      email,
      senha,
      confirmaSenha
    });
  } catch (error) {
    return JSON.parse(JSON.stringify(error as ZodError));
  }
};
