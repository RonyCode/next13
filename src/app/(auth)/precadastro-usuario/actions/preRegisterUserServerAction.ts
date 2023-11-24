'use server';

import { PreRegisterUserSchema } from '@/app/(auth)/precadastro-usuario/schemas/PreRegisterUserSchema';
import { ZodError } from 'zod';

export const preRegisterUserServerActions = async (data: FormData) => {
  try {
    return PreRegisterUserSchema.parse(data);
  } catch (error) {
    return JSON.parse(JSON.stringify(error as ZodError));
  }
};
