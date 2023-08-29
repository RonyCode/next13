'use client';

import * as React from 'react';
import { useTransition } from 'react';
import { MdPassword } from 'react-icons/md';
import InputMask from 'react-input-mask';

import { signInServerActions } from '@/app/(auth)/login/actions/signInServerAction';
import { useFormLogin } from '@/app/(auth)/login/hooks/useFormLogin';
import { useSignIn } from '@/app/(auth)/login/hooks/useSign';
import { SignInSchema } from '@/app/(auth)/login/schemas/SignInSchema';
import { Input } from '@/components/Form/Input';
import Button from '@/ui/Button';
import { User } from 'lucide-react';

const RegisterUserForm = () => {
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
      <div className=" w-full gap-8 m-x-12 ">
        <form action={handleSubmitLogin}>
          <Input.Root>
            <Input.Content
              autoFocus={true}
              {...register('nome')}
              label="Nome Completo"
              icon={User}
              name="email"
              placeholder="Digite seu nom completo"
              hasError={errors.nome?.message}
            />
            <Input.HelpText
              text={errors.nome?.message && '📣 ' + errors.nome?.message}
            />
          </Input.Root>
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

          <Input.Root>
            <Input.Content
              {...register('cpf')}
              autoFocus={true}
              label="CPF"
              icon={User}
              name="cpf"
              className="text-black"
              mask="999.999.999-99"
              placeholder="Digite seu CPF"
              hasError={errors.cpf?.message}
            />
            <Input.HelpText
              text={errors.cpf?.message && '📣 ' + errors.cpf?.message}
            />
          </Input.Root>
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
              Cancelar
            </Button>
            <Button
              isLoading={pending}
              disabled={hasError || pending}
              variant="default"
              className="mr-2 w-full max-w-sm p-2 focus:ring-opacity-50"
              type="submit"
            >
              Cadastrar
            </Button>
          </div>
        </form>

        <div className="text-center text-xs text-gray-500">
          &copy;2023 RCode All rights reserved.
        </div>
      </div>
    </>
  );
};
export default RegisterUserForm;
