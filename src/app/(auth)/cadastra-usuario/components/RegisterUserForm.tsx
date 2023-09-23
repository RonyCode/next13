'use client';

import * as React from 'react';
import { useTransition } from 'react';
import { MdPassword } from 'react-icons/md';

import { registerUserServerActions } from '@/app/(auth)/cadastra-usuario/actions/registerUserServerAction';
import { useFormRegister } from '@/app/(auth)/cadastra-usuario/hooks/useFormRegister';
import { useRegister } from '@/app/(auth)/cadastra-usuario/hooks/useRegister/useRegister';
import { RegisterUserSchema } from '@/app/(auth)/cadastra-usuario/schemas/RegisterUserSchema';
import { Input } from '@/components/Form/Input';
import Button from '@/ui/Button';
import { User } from 'lucide-react';

const RegisterUserForm = () => {
  const { errors, register } = useFormRegister();
  const { registerUser } = useRegister();
  const [pending, startTransition] = useTransition();
  const handleSubmitCadastro = async (data: FormData) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result: RegisterUserSchema | any = await registerUserServerActions(
      data
    );
    if (!Array.isArray(result?.details)) {
      startTransition(async () => {
        await registerUser(result);
      });
    }
  };

  const hasError =
    (errors.email?.message?.length && errors.email?.message?.length > 0) ||
    (errors.nome?.message?.length && errors.nome?.message?.length > 0) ||
    (errors.senha?.message?.length && errors.senha?.message?.length > 0);
  return (
    <>
      <div className=" w-full gap-8 m-x-12 ">
        <form action={handleSubmitCadastro}>
          <Input.Root>
            <Input.Content
              autoFocus={true}
              {...register('nome')}
              label="Nome Completo"
              icon={User}
              name="nome"
              placeholder="Digite seu nom completo"
              hasError={errors.nome?.message}
            />
            <Input.HelpText
              text={errors.nome?.message && '📣 ' + errors.nome?.message}
            />
          </Input.Root>
          <div className="flex flex-col sm:flex-row gap-2">
            <Input.Root className="mb-2 w-full">
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
          </div>
          <div className="flex gap-2">
            <Input.Root className="mb-2 w-full">
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

            <Input.Root className="mb-2 w-full">
              <Input.Content
                autoFocus={true}
                {...register('confirmaSenha')}
                label="Confirma senha"
                icon={User}
                name="confirmaSenha"
                placeholder="Digite sua senha conforme a primeira"
                hasError={errors.confirmaSenha?.message}
              />
              <Input.HelpText
                text={
                  errors.confirmaSenha?.message &&
                  '📣 ' + errors.confirmaSenha?.message
                }
              />
            </Input.Root>
          </div>
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
