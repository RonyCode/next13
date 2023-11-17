'use client';
import { toast } from 'react-toastify';

import { useRouter } from 'next/navigation';

import { PreRegisterUserSchema } from '@/app/(auth)/precadastro-usuario/schemas/PreRegisterUserSchema';
import { fetchWrapper } from '@/functions/fetch';
import { z } from 'zod';

interface usePreRegister {
  data: boolean;
  status: string;
  code: number;
  message: string;
}

export const usePreRegister = () => {
  const router = useRouter();

  const preRegisterUser = async (data: PreRegisterUserSchema) => {
    try {
      const { email } = data;

      const res = await fetchWrapper<usePreRegister>(
        '/api/pre-cadastro-usuario',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email })
        }
      );

      if (res.code == 200) {
        toast.success(
          'Email enviado com sucesso! por favor verifique sua caixa de entrada! 👌'
        );
        router.push('/');
      }

      if (res.code == 400) {
        toast.error(`${res.message} 📢`);
      }
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
