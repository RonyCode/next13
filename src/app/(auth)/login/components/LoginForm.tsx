'use client';

import * as React from 'react';
import { useTransition } from 'react';
import { MdPassword } from 'react-icons/md';

import Link from 'next/link';

import { signInServerActions } from '@/app/(auth)/login/actions/signInServerAction';
import { useFormLogin } from '@/app/(auth)/login/hooks/useFormLogin';
import { useSignIn } from '@/app/(auth)/login/hooks/useSign';
import { SignInSchema } from '@/app/(auth)/login/schemas/SignInSchema';
import { Input } from '@/components/Form/Input';
import Button from '@/ui/Button';
import { User } from 'lucide-react';

const LoginForm = () => {
  const { errors, register } = useFormLogin();
  const { signInWithGoogle, signInWithCredentials } = useSignIn();
  // eslint-disable-next-line prefer-const
  let [pending, startTransition] = useTransition();
  const handleSubmitLogin = async (data: FormData) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result: SignInSchema | any = await signInServerActions(data);
    if (!Array.isArray(result?.details)) {
      startTransition(async () => {
        await signInWithCredentials(result);
      });
    }
  };

  const handleSubmitLoginWithGoogle = async () => {
    startTransition(async () => {
      await signInWithGoogle();
    });
  };

  const hasError =
    (errors.email?.message?.length && errors.email?.message?.length > 0) ||
    (errors.senha?.message?.length && errors.senha?.message?.length > 0);
  return (
    <>
      <div className=" w-full  md:w-96  ">
        <form action={handleSubmitLogin}>
          <Input.Root>
            <Input.Content
              autoFocus={true}
              {...register('email')}
              label="Email"
              icon={User}
              name="email"
              placeholder="Digite seu email"
              hasError={errors.email?.message}
            />
            <Input.HelpText
              text={errors.email?.message && '📣 ' + errors.email?.message}
            />
          </Input.Root>

          <Input.Root className="mb-2">
            <Input.Content
              {...register('senha')}
              icon={MdPassword}
              label="Senha"
              name="senha"
              placeholder="Digite sua senha"
              type="password"
              hasError={errors.senha?.message}
            />
            <Input.HelpText
              text={errors.senha?.message && '📣 ' + errors.senha?.message}
            />
          </Input.Root>
          <div className="mt-3 flex items-center justify-between ">
            <Button
              isLoading={pending}
              disabled={hasError || pending}
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

        <h1 className="py-4 text-center text-xl">OR</h1>

        <Button
          disabled={pending}
          isLoading={pending}
          type="button"
          variant="default"
          className="mx-auto mb-3 w-full  p-2"
          onClick={handleSubmitLoginWithGoogle}
        >
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
          Google
        </Button>

        <div className="text-center text-xs text-gray-500">
          &copy;2023 RCode All rights reserved.
        </div>
      </div>
    </>
  );
};
export default LoginForm;
