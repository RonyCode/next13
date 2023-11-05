import { z } from 'zod';

const minimoCaracteresSenha = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
export const PreRegisterUserSchema = z
  .object({
    email: z.string().email({ message: 'Email inválido' }),
    nome: z.string().min(3, {
      message: 'nome inválido deve conter no mínimo 3 caracteres'
    }),
    senha: z
      .string()
      .min(8, {
        message:
          'Senha inválida deve conter no mínimo 8 caracteres com no mínimo uma letra'
      })
      .regex(minimoCaracteresSenha, {
        message:
          'Senha inválida deve conter no mínimo 8 caracteres com no mínimo uma letra'
      }),
    confirmaSenha: z.string(),
    telefone: z.string().trim().min(15, { message: 'Telefone inválido' }).trim()
  })
  .refine(({ senha, confirmaSenha }) => senha === confirmaSenha, {
    path: ['confirmaSenha'],
    message: 'Senhas não conferem'
  });

export type RegisterUserSchema = z.infer<typeof PreRegisterUserSchema>;
