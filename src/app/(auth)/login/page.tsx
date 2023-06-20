'use client';

import React from 'react';

import 'react-toastify/dist/ReactToastify.css';
import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { signIn } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { redirect, useRouter } from 'next/navigation';

import Button from '@/components/ui/Button';
import { loginValidator } from '@/lib/validations/login-validator';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

type FormData = z.infer<typeof loginValidator>;

const Page: FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showSuccessState, setShowSuccessState] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<FormData>({ resolver: zodResolver(loginValidator) });

  async function loginWithGoogle() {
    setIsLoading(true);
    try {
      await signIn('google', {
        redirect: false
      });
      toast.success('Login realizado com sucesso! 👌');
    } catch (error) {
      // display error message to user
      toast.error('Erro ao tentar logar tente novamente! 🤯');
    } finally {
      setIsLoading(false);
    }
  }

  const mySignIn = async (data: FormData) => {
    setIsLoading(true);

    const { email, senha } = loginValidator.parse(data);

    try {
      await signIn('credentials', {
        email,
        senha,
        redirect: false
      }).then((res) => {
        if (res?.error == null) {
          toast.success('Login realizado com sucesso! 👌');
        } else {
          toast.error('Erro ao tentar logar tente novamente! 🤯');
        }
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        setError('email', { message: error.message });
        setError('senha', { message: error.message });
        return;
      }
      if (error instanceof Error) {
        setError('email', { message: error.message });
        setError('senha', { message: error.message });
        return;
      }
      toast.error('Something went wrong with your login.');
      setError('email', { message: 'Something went wrong' });
    } finally {
      setIsLoading(false);
    }
  };
  const closeAfter15 = () =>
    toast('Will close after 15s', { autoClose: 15000 });
  const handleSubmitLogin = async (data: FormData) => {
    await mySignIn(data);
  };

  return (
    <>
      <div className=" flex min-h-screen items-center justify-center bg-slate-800 px-4  sm:px-6 lg:px-8">
        <div className="min-w-md flex w-6/12 flex-col items-center space-y-8 rounded bg-slate-700 py-12 text-white">
          <button onClick={closeAfter15}>Close after 15 seconds</button>

          <div className="flex h-full w-full flex-col items-center gap-8  ">
            <Image
              src="/images/logo.png"
              alt="imagem de logotipo"
              width={200}
              height={200}
            />{' '}
            <div className="w-full max-w-sm  ">
              <form
                onSubmit={handleSubmit(handleSubmitLogin)}
                className="mb-4 rounded bg-slate-300  px-12 pb-8 pt-6 shadow-md"
              >
                <div className="mb-4">
                  <label
                    className="mb-2 block text-sm font-bold text-gray-700"
                    htmlFor="login"
                  >
                    Login
                  </label>
                  <input
                    {...register('email')}
                    className="focus:shadow-outline mx-auto w-full max-w-sm appearance-none rounded border p-2 px-3 py-2 text-base leading-tight text-gray-700 shadow focus:outline-none"
                    id="login"
                    type="text"
                    placeholder="Login"
                  />
                  <p className="mt-1 text-sm text-red-600">
                    {errors.email?.message}
                  </p>
                  {showSuccessState && (
                    <p className="mt-1 text-sm text-green-600">Success</p>
                  )}
                </div>
                <div className="mb-6">
                  <label
                    className="mb-2 block text-sm font-bold text-gray-700"
                    htmlFor="senha"
                  >
                    Senha
                  </label>
                  <input
                    {...register('senha')}
                    className=" focus:shadow-outline mx-auto mb-3 w-full  max-w-sm appearance-none rounded border border-red-500  px-3 py-2 text-base leading-tight text-gray-700 shadow focus:outline-none"
                    id="senha"
                    type="senha"
                    placeholder="**********"
                  />
                  <p className=" text-sm text-red-600">
                    {errors.senha?.message}
                  </p>
                  {showSuccessState && (
                    <p className=" text-sm text-green-600">Success</p>
                  )}{' '}
                </div>

                <div className="flex items-center justify-between">
                  <Button
                    isLoading={isLoading}
                    variant="default"
                    className="mr-2 w-full max-w-sm p-2"
                    type="submit"
                  >
                    Login
                  </Button>
                  <Link
                    className="ml-2 inline-block align-baseline text-sm font-bold text-blue-500 hover:text-blue-800"
                    href="/recupera-senha"
                  >
                    Esqueceu sua senha?
                  </Link>
                </div>
              </form>
            </div>
          </div>
          <h1 className="text-xl">OR</h1>
          <Button
            isLoading={isLoading}
            type="button"
            variant="default"
            className="mx-auto w-full max-w-sm p-2"
            onClick={loginWithGoogle}
          >
            {isLoading ? null : (
              <svg
                className="mr-2 h-4 w-4"
                aria-hidden="true"
                focusable="false"
                data-prefix="fab"
                data-icon="github"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
                <path d="M1 1h22v22H1z" fill="none" />
              </svg>
            )}
            Google
          </Button>

          <p className="text-center text-xs text-gray-500">
            &copy;2023 RCode All rights reserved.
          </p>
        </div>
      </div>
    </>
  );
};

export default Page;
