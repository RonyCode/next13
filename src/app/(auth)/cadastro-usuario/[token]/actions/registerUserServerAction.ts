'use server';

import { RegisterUserSchema } from '@/app/(auth)/cadastro-usuario/[token]/schemas/RegisterUserSchema';
import { zact } from 'zact/server';
import { ZodError } from 'zod';

export const validatedAction = zact(RegisterUserSchema)(async ({
  nome,
  email,
  cpf,
  data_nascimento,
  telefone,
  cep,
  endereco,
  numero,
  bairro,
  cidade,
  estado,
  senha,
  confirmaSenha
}) => {
  return {
    nome,
    email,
    cpf,
    data_nascimento,
    telefone,
    cep,
    endereco,
    numero,
    bairro,
    cidade,
    estado,
    senha,
    confirmaSenha
  };
});
export const registerUserServerActions = async (data: FormData) => {
  try {
    const nome = data.get('nome') as string;
    const email = data.get('email') as string;
    const cpf = data.get('cpf') as string;
    const data_nascimento = data.get('data_nascimento') as string;
    const telefone = data.get('telefone') as string;
    const cep = data.get('cep') as string;
    const endereco = data.get('endereco') as string;
    const numero = data.get('numero') as string;
    const bairro = data.get('bairro') as string;
    const cidade = data.get('cidade') as string;
    const estado = data.get('estado') as string;
    const senha = data.get('senha') as string;
    const confirmaSenha = data.get('confirmaSenha') as string;

    return await validatedAction({
      nome,
      email,
      cpf,
      data_nascimento,
      telefone,
      cep,
      endereco,
      numero,
      bairro,
      cidade,
      estado,
      senha,
      confirmaSenha
    });
  } catch (error) {
    return JSON.parse(JSON.stringify(error as ZodError));
  }
};
