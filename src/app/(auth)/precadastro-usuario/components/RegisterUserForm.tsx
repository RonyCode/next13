'use client';

import * as React from 'react';
import { useTransition } from 'react';
import { MdPassword } from 'react-icons/md';

import { useFormRegister } from '@/app/(auth)/cadastra-usuario/hooks/useFormRegister';
import { useRegister } from '@/app/(auth)/cadastra-usuario/hooks/useRegister/useRegister';
import { RegisterUserSchema } from '@/app/(auth)/cadastra-usuario/schemas/RegisterUserSchema';
import { registerUserServerActions } from '@/app/(auth)/precadastro-usuario/actions/preRegisterUserServerAction';
import { Input } from '@/components/Form/Input';
import Button from '@/ui/Button';
import { Phone, User } from 'lucide-react';

const RegisterUserForm = () => {
  const { errors, register } = useFormRegister();
  const { registerUser } = useRegister();
  const [pending, startTransition] = useTransition();
  const handleSubmitCadastro = async (data: FormData) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result: RegisterUserSchema | any =
      await registerUserServerActions(data);

    if (!Array.isArray(result?.details)) {
      startTransition(async () => {
        await registerUser(result);
      });
    }
  };

  const hasError =
    (errors.email?.message?.length && errors.email?.message?.length > 0) ||
    (errors.senha?.message?.length && errors.senha?.message?.length > 0) ||
    (errors.confirmaSenha?.message?.length &&
      errors.confirmaSenha?.message?.length > 0);
  return (
    <>
      <div className=" w-full gap-12 p-2 md:p-8 ">
        <form action={handleSubmitCadastro}>
          <div className="flex flex-col sm:flex-row gap-2">
            <Input.Root className="mb-2 w-full">
              <Input.Content
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
          <div className="flex flex-col sm:flex-row gap-2">
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
                {...register('confirmaSenha')}
                label="Confirma senha"
                type="password"
                icon={MdPassword}
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

        <div className="text-center text-xs text-gray-500 mt-12">
          &copy;2023 RCode All rights reserved.
        </div>
      </div>
    </>
  );
};
export default RegisterUserForm;
