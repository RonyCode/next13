'use client';
import { toast } from 'react-toastify';

import { PreRegisterUserSchema } from '@/app/(auth)/precadastro-usuario/schemas/PreRegisterUserSchema';
import { fetchWrapper } from '@/functions/fetch';
import { z } from 'zod';

export const usePreRegister = () => {
  const preRegisterUser = async (data: PreRegisterUserSchema) => {
    try {
      const { email } = data;

      await fetchWrapper('/api/pre-cadastro-usuario', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
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
    preRegisterUser
  };
};
