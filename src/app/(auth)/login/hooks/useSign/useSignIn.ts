'use client';
import { toast } from 'react-toastify';

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import { SignInSchema } from '@/app/(auth)/login/schemas/SignInSchema';
import { z } from 'zod';

export const useSignIn = () => {
  const router = useRouter();

  async function signInWithGoogle() {
    try {
      await signIn('google', {
        callbackUrl: 'http://localhost:3000/dashboard'
      });
      toast.success('Login realizado com sucesso! 👌');
    } catch (error) {
      // display error message to user
      toast.error('Erro ao tentar logar tente novamente! 🤯');
    }
  }

  const signInWithCredentials = async (data: SignInSchema) => {
    try {
      const { email, senha, nome, image, is_user_externo } = data;
      await signIn('credentials', {
        email,
        senha,
        nome,
        image,
        is_user_externo,
        redirect: false
      }).then((res) => {
        if (res?.error == null) {
          toast.success('Login realizado com sucesso! 👌');
          router.push('/dashboard');
        } else {
          toast.error('Email ou senha incorretos, tente novamente! 🤯');
        }
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
    signInWithCredentials,
    signInWithGoogle
  };
};
