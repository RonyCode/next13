'use client';

import * as React from 'react';
import { useTransition } from 'react';

import { useFormRegister } from '@/app/(auth)/cadastra-usuario/hooks/useFormRegister';
import { preRegisterUserServerActions } from '@/app/(auth)/precadastro-usuario/actions/preRegisterUserServerAction';
import { useFormPreRegister } from '@/app/(auth)/precadastro-usuario/hooks/useFormPreRegister';
import { usePreRegister } from '@/app/(auth)/precadastro-usuario/hooks/usePreRegister/usePreRegister';
import { PreRegisterUserSchema } from '@/app/(auth)/precadastro-usuario/schemas/PreRegisterUserSchema';
import { Input } from '@/components/Form/Input';
import Button from '@/ui/Button';
import { User } from 'lucide-react';

const PreRegisterUserForm = () => {
  const { errors, register } = useFormPreRegister();
  const { preRegisterUser } = usePreRegister();
  const [pending, startTransition] = useTransition();

  const handleSubmitPreCadastro = async (data: FormData) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result: PreRegisterUserSchema | any =
      await preRegisterUserServerActions(data);
    if (!Array.isArray(result?.details)) {
      startTransition(async () => {
        await preRegisterUser(result);
      });
    }
  };

  const hasError =
    errors.email?.message?.length && errors.email?.message?.length > 0;

  return (
    <>
      <div className=" w-full gap-12 p-2 md:p-8 ">
        <form action={handleSubmitPreCadastro}>
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

          <div className="mt-3">
            <Button
              isLoading={pending}
              disabled={hasError || pending}
              variant="default"
              className="mr-2 w-2/6 max-w-sm p-2 focus:ring-opacity-50 float-right"
              type="submit"
            >
              Enviar
            </Button>
          </div>
        </form>
      </div>
      <div className="text-center text-xs text-gray-500">
        &copy;2023 RCode All rights reserved.
      </div>
    </>
  );
};
export default PreRegisterUserForm;
