'use client';

import * as React from 'react';
import { useTransition } from 'react';
import { FaBirthdayCake, FaCity } from 'react-icons/fa';
import { FaTreeCity } from 'react-icons/fa6';
import { GiModernCity } from 'react-icons/gi';
import { MdNumbers, MdPassword } from 'react-icons/md';
import { SiOpenstreetmap } from 'react-icons/si';
import { TbNumber } from 'react-icons/tb';

import { useFormRegister } from '@/app/(auth)/cadastro-usuario/[token]/hooks/useFormRegister';
import { Input } from '@/components/Form/Input';
import Button from '@/ui/Button';
import { Mail, Phone, User } from 'lucide-react';

import { submitUserForm } from '../../../../../../actions/userActions';

export const UserForm = () => {
  const { errors, register } = useFormRegister();
  const [pending, startTransition] = useTransition();

  const handleSubmit = async (data: FormData) => {
    startTransition(async () => {
      await submitUserForm(data);
    });
  };

  const hasErro = Object.keys(errors).length > 0;

  return (
    <form action={handleSubmit} className="min-w-full px-4 md:px-8">
      <div className="flex flex-col sm:flex-row gap-2 my-2">
        <Input.Root>
          <Input.Label label="Nome" icon={User} htmlFor="nome" />
          <Input.Content
            {...register('nome')}
            id="nome"
            name="nome"
            placeholder="Digite seu nome"
            hasError={errors.nome?.message}
          />
          <Input.HelpText
            text={errors.nome?.message && '📣 ' + errors.nome?.message}
          />
        </Input.Root>
      </div>

      <div className="flex flex-col sm:flex-row gap-2 my-2">
        <Input.Root>
          <Input.Label label="Email" icon={Mail} htmlFor="email" />
          <Input.Content
            {...register('email')}
            name="email"
            id="email"
            placeholder="Digite seu email"
            hasError={errors.email?.message}
          />
          <Input.HelpText
            text={errors.email?.message && '📣 ' + errors.email?.message}
          />
        </Input.Root>

        <Input.Root className="w-full md:w-6/12">
          <Input.Label htmlFor="cpf" label="Cpf" icon={MdNumbers} />
          <Input.ContentMasked
            {...register('cpf')}
            name="cpf"
            id="cpf"
            mask="___.___.___-__"
            placeholder="999.999.999-99"
            hasError={errors.cpf?.message}
          />
          <Input.HelpText
            text={errors.cpf?.message && '📣 ' + errors.cpf?.message}
          />
        </Input.Root>
      </div>
      <div className="flex flex-col sm:flex-row gap-2 my-2 ">
        <Input.Root>
          <Input.Label
            label="Nascimento"
            icon={FaBirthdayCake}
            htmlFor="data_nascimento"
          />
          <Input.ContentMasked
            {...register('data_nascimento')}
            mask="__/__/____"
            name="data_nascimento"
            id="data_nascimento"
            placeholder="99/99/9999"
            hasError={errors.data_nascimento?.message}
          />
          <Input.HelpText
            text={
              errors.data_nascimento?.message &&
              '📣 ' + errors.data_nascimento?.message
            }
          />
        </Input.Root>

        <Input.Root>
          <Input.Label label="Telefone" icon={Phone} htmlFor="telefone" />
          <Input.ContentMasked
            {...register('telefone')}
            id="telefone"
            name="telefone"
            mask="(__) _____-____"
            placeholder="(99) 99999-9999"
            hasError={errors.telefone?.message}
          />
          <Input.HelpText
            text={errors.telefone?.message && '📣 ' + errors.telefone?.message}
          />
        </Input.Root>
        <Input.Root>
          <Input.Label label="Cep" icon={MdNumbers} htmlFor="cep" />
          <Input.ContentMasked
            {...register('cep')}
            name="cep"
            id="cep"
            mask="_____-___"
            placeholder="99999-999"
            hasError={errors.cep?.message}
          />
          <Input.HelpText
            text={errors.cep?.message && '📣 ' + errors.cep?.message}
          />
        </Input.Root>
      </div>
      <div className="flex flex-col sm:flex-row gap-2 my-2">
        <Input.Root>
          <Input.Label
            label="Endereço"
            icon={SiOpenstreetmap}
            htmlFor="endereco"
          />
          <Input.Content
            {...register('endereco')}
            name="endereco"
            id="endereco"
            placeholder="Digite seu endereco"
            hasError={errors.endereco?.message}
          />
          <Input.HelpText
            text={errors.endereco?.message && '📣 ' + errors.endereco?.message}
          />
        </Input.Root>

        <Input.Root className="w-full md:w-6/12">
          <Input.Label label="Numero" icon={TbNumber} htmlFor="numero" />
          <Input.Content
            {...register('numero')}
            name="numero"
            id="numero"
            placeholder="Numero residência"
            hasError={errors.numero?.message}
          />
          <Input.HelpText
            text={errors.numero?.message && '📣 ' + errors.numero?.message}
          />
        </Input.Root>
      </div>

      <div className="flex flex-col sm:flex-row gap-2 my-2">
        <Input.Root>
          <Input.Label label="Bairro" icon={FaTreeCity} htmlFor="bairro" />
          <Input.Content
            {...register('bairro')}
            name="bairro"
            id="bairro"
            placeholder="Digite seu bairro"
            hasError={errors.bairro?.message}
          />
          <Input.HelpText
            text={errors.bairro?.message && '📣 ' + errors.bairro?.message}
          />
        </Input.Root>
        <Input.Root>
          <Input.Label label="Cidade" icon={FaCity} htmlFor="cidade" />
          <Input.Content
            {...register('cidade')}
            name="cidade"
            id="cidade"
            placeholder="Digite sua cidade"
            hasError={errors.cidade?.message}
          />
          <Input.HelpText
            text={errors.cidade?.message && '📣 ' + errors.cidade?.message}
          />
        </Input.Root>

        <Input.Root>
          <Input.Label label="Estado" icon={GiModernCity} htmlFor="estado" />
          <Input.Content
            {...register('estado')}
            name="estado"
            id="estado"
            placeholder="Digite seu estado"
            hasError={errors.estado?.message}
          />
          <Input.HelpText
            text={errors?.estado?.message && '📣 ' + errors.estado?.message}
          />
        </Input.Root>
      </div>
      <div className="flex flex-col sm:flex-row gap-2 my-2">
        <Input.Root>
          <Input.Label label="Senha" icon={MdPassword} htmlFor="senha" />
          <Input.Content
            {...register('senha')}
            name="senha"
            id="senha"
            placeholder="Digite sua senha"
            type="password"
            hasError={errors.senha?.message}
          />
          <Input.HelpText
            text={errors.senha?.message && '📣 ' + errors.senha?.message}
          />
        </Input.Root>

        <Input.Root>
          <Input.Label
            label="Confirma Senha"
            icon={MdPassword}
            htmlFor="confirmaSenha"
          />
          <Input.Content
            {...register('confirmaSenha')}
            type="password"
            name="confirmaSenha"
            id="confirmaSenha"
            placeholder="Repita sua senha"
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
      <div className=" float-right w-1/2 mt-3 flex items-center justify-between ">
        <Button
          isLoading={pending}
          disabled={hasErro || pending}
          variant="default"
          className="mx-2 w-full max-w-sm p-2"
          type="submit"
        >
          Cancelar
        </Button>
        <Button
          isLoading={pending}
          disabled={hasErro || pending}
          variant="default"
          className="mr-2 w-full max-w-sm p-2 focus:ring-opacity-50"
          type="submit"
        >
          Cadastrar
        </Button>
      </div>
    </form>
  );
};
