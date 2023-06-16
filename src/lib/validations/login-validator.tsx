import { z } from 'zod';

const minimoCaracteresSenha = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
export const loginValidator = z.object({
  email: z.string().email(),
  senha: z.string().min(8).regex(minimoCaracteresSenha)
});
