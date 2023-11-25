'use client';

import * as React from 'react';
import { useTransition } from 'react';
import { toast } from 'react-toastify';

import { preRegisterUserServerActions } from '@/app/(auth)/precadastro-usuario/actions/preRegisterUserServerAction';
import { useFormPreRegister } from '@/app/(auth)/precadastro-usuario/hooks/useFormPreRegister';
import { Input } from '@/components/Form/Input';
import Button from '@/ui/Button';
import { Mail } from 'lucide-react';

const PreRegisterUserForm = () => {
  const { errors, register } = useFormPreRegister();
  const [pending, startTransition] = useTransition();

  const handleSubmitPreCadastro = async (data: FormData) => {
    startTransition(async () => {
      const result = await preRegisterUserServerActions(data);
      if (result) {
        if ('code' in result && result.code == 200) {
          toast.success(`${result?.message} 👌`);
        }
        if ('code' in result && result.code == 400) {
          toast.error(`${result?.message}   📢`);
        }
      }
    });
  };

  const hasError =
    errors.email?.message?.length && errors.email?.message?.length > 0;

  return (
    <>
      <div className=" w-full gap-12 p-2 md:p-8 ">
        <form action={handleSubmitPreCadastro}>
          <div className="flex flex-col sm:flex-row gap-2">
            <Input.Root className="mb-2 w-full">
              <Input.Label label="Email" icon={Mail} htmlFor="email" />
              <Input.Content
                {...register('email')}
                label="Email"
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
    </>
  );
};
export default PreRegisterUserForm;
