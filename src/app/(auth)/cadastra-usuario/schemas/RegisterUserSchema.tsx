import { z } from 'zod';

const minimoCaracteresSenha = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

const validarCPF = (inputCPF: string) => {
  let soma = 0;
  let resto;

  if (inputCPF == '00000000000') return false;
  for (let i = 1; i <= 9; i++)
    soma = soma + parseInt(inputCPF.substring(i - 1, i)) * (11 - i);
  resto = (soma * 10) % 11;

  if (resto == 10 || resto == 11) resto = 0;
  if (resto != parseInt(inputCPF.substring(9, 10))) return false;

  soma = 0;
  for (let i = 1; i <= 10; i++)
    soma = soma + parseInt(inputCPF.substring(i - 1, i)) * (12 - i);
  resto = (soma * 10) % 11;

  if (resto == 10 || resto == 11) resto = 0;
  return resto == parseInt(inputCPF.substring(10, 11));
};

export const RegisterUserSchema = z
  .object({
    nome: z.string().min(3, {
      message: 'nome inválido deve conter no mínimo 3 caracteres'
    }),

    cpf: z
      .string()
      .min(11, {
        message: 'Cpf inválido'
      })
      .max(11, { message: 'Cpf inválido' }),

    endereco: z.string().min(3, {
      message: 'endereço inválido deve conter no mínimo 3 caracteres'
    }),

    cidade: z.string().min(3, {
      message: 'Cidade inválida deve conter no mínimo 3 caracteres'
    }),

    estado: z.string().min(2, {
      message: 'Estado deve conter no mínimo 2 caracteres'
    }),

    confirmaSenha: z.string(),

    telefone: z
      .string()
      .trim()
      .min(15, { message: 'Telefone inválido' })
      .trim(),

    fotoPerfil: z.string(),

    email: z.string().email({ message: 'Email inválido' }),

    senha: z
      .string()
      .min(8, {
        message:
          'Senha inválida deve conter no mínimo 8 caracteres com no mínimo uma letra'
      })
      .regex(minimoCaracteresSenha, {
        message:
          'Senha inválida deve conter no mínimo 8 caracteres com no mínimo uma letra'
      })
  })
  .refine(({ senha, confirmaSenha }) => senha === confirmaSenha, {
    path: ['confirmaSenha'],
    message: 'Senhas não conferem'
  })
  .refine(({ cpf }) => validarCPF(cpf), {
    path: ['cpf'],
    message: 'Cpf não existe!'
  });

export type RegisterUserSchema = z.infer<typeof RegisterUserSchema>;
