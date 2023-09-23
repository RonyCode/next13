import { z } from 'zod';

const minimoCaracteresSenha = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
export const RegisterUserSchema = z.object({
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
  confirmaSenha: z.string().min(8, {})
});

export type RegisterUserSchema = z.infer<typeof RegisterUserSchema>;
