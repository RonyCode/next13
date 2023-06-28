'use client';

import { useState, useTransition } from 'react';

import Link from 'next/link';

import { signInServerActions } from '@/app/(auth)/login/actions/signInServerAction';
import { useFormLogin } from '@/app/(auth)/login/hooks/useFormLogin';
import { useSignIn } from '@/app/(auth)/login/hooks/useSign';
import { SignInSchema } from '@/app/(auth)/login/schemas/SignInSchema';
import { Input } from '@/components/Form';
import Button from '@/ui/Button';

const LoginForm = () => {
  const [isPending] = useTransition();
  const { setError, errors } = useFormLogin();
  const { signInWithGoogle, signInWithCredentials } = useSignIn();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmitLogin = async (data: FormData) => {
    const result: { senha: string; email: string } | SignInSchema[] =
      await signInServerActions(data);

    if (Array.isArray(result)) {
      for (const itemElement of result) {
        if (itemElement.email)
          setError('email', { message: itemElement.email });
        if (itemElement.senha)
          setError('senha', { message: itemElement.senha });
      }
    } else {
      setError('email', { message: '' });
      setError('senha', { message: '' });
      await signInWithCredentials(result);
    }
  };

  return (
    <>
      <form
        action={handleSubmitLogin}
        className="mb-4 rounded bg-slate-300  px-12 pb-8 pt-6 shadow-md"
      >
        <div className="mb-4">
          <Input
            label="Email"
            className="focus:shadow-outline mx-auto w-full max-w-sm appearance-none rounded border p-2 px-3 py-2 text-base leading-tight text-gray-700 shadow focus:outline-none"
            name="email"
            type="text"
            placeholder="Login"
            helpText={errors.email?.message}
          />
        </div>
        <div className="mb-6">
          <Input
            label="Senha"
            name="senha"
            type="password"
            helpText={errors.senha?.message}
            placeholder="**********"
          />
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
      <h1 className="text-xl">OR</h1>
      <Button
        isLoading={isLoading}
        type="button"
        variant="default"
        className="mx-auto w-full max-w-sm p-2"
        onClick={signInWithGoogle}
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
    </>
  );
};
export default LoginForm;
