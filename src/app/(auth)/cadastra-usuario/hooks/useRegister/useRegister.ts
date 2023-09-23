'use client';
import { toast } from 'react-toastify';

import { RegisterUserSchema } from '@/app/(auth)/cadastra-usuario/schemas/RegisterUserSchema';
import { z } from 'zod';

export const useRegister = () => {
  const registerUser = async (data: RegisterUserSchema) => {
    try {
      const { email, senha, nome } = data;

      const res = await fetch(`${process.env.API_NEXT}/api/cadastro-usuario`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, nome, senha })
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return error;
      }
      if (error instanceof Error) {
        return error;
      }
      toast.error('Something went wrong with your login.');
    }
  };

  return {
    registerUser
  };
};
