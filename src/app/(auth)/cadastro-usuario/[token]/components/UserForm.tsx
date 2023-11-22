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
import { userErrorRegisterStore } from '../../../../../../store/userErrorRegisterStore';
import { useUserStore } from '../../../../../../store/userStore';

export const UserForm = () => {
  const { errors, register } = useFormRegister();
  // const [pending, startTransition] = useTransition();
  const dataUser = useUserStore.getState().state.user;
  const dataUserErro = userErrorRegisterStore((state) => state.user);

  const handleSubmit = async (data: FormData) => {
    await submitUserForm(data);
  };

  return (
    <form action={handleSubmit} className="min-w-full px-4 md:px-8">
      {dataUser.cpf}
      {dataUser.email}
      <div className="flex flex-col sm:flex-row gap-2 my-2">
        <Input.Root>
          <Input.Label label="Nome" icon={User} htmlFor="nome" />
          <Input.Content
            {...register('nome')}
            id="nome"
            name="nome"
            placeholder="Digite seu nome"
            hasError={dataUserErro?.nome || errors.nome?.message}
          />
          <Input.HelpText
            text={
              (dataUserErro?.nome && '📣 ' + dataUserErro?.nome) ||
              (errors.nome?.message && '📣 ' + errors.nome?.message)
            }
          />
        </Input.Root>
      </div>

      <div className="flex flex-col sm:flex-row gap-2 my-2">
        <Input.Root>
          <Input.Label label="Email" icon={Mail} htmlFor="email" />
          <Input.Content
            name="email"
            id="email"
            placeholder="Digite seu email"
            hasError={dataUserErro?.email}
          />
          <Input.HelpText
            text={dataUserErro?.email && '📣 ' + dataUserErro?.email}
          />
        </Input.Root>

        <Input.Root className="w-full md:w-6/12">
          <Input.Label htmlFor="cpf" label="Cpf" icon={MdNumbers} />
          <Input.ContentMasked
            name="cpf"
            id="cpf"
            mask="___.___.___-__"
            placeholder="999.999.999-99"
            hasError={dataUserErro?.cpf}
          />
          <Input.HelpText
            text={dataUserErro?.cpf && '📣 ' + dataUserErro?.cpf}
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
            mask="__/__/____"
            name="data_nascimento"
            id="data_nascimento"
            placeholder="99/99/9999"
            hasError={dataUserErro?.data_nascimento}
          />
          <Input.HelpText
            text={
              dataUserErro?.data_nascimento &&
              '📣 ' + dataUserErro?.data_nascimento
            }
          />
        </Input.Root>

        <Input.Root>
          <Input.Label label="Telefone" icon={Phone} htmlFor="telefone" />
          <Input.ContentMasked
            id="telefone"
            name="telefone"
            mask="(__) _____-____"
            placeholder="(99) 99999-9999"
            hasError={dataUserErro?.telefone}
          />
          <Input.HelpText
            text={dataUserErro?.telefone && '📣 ' + dataUserErro?.telefone}
          />
        </Input.Root>
        <Input.Root>
          <Input.Label label="Cep" icon={MdNumbers} htmlFor="cep" />
          <Input.ContentMasked
            name="cep"
            id="cep"
            mask="_____-___"
            placeholder="99999-999"
            hasError={dataUserErro?.cep}
          />
          <Input.HelpText
            text={dataUserErro?.cep && '📣 ' + dataUserErro?.cep}
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
            name="endereco"
            id="endereco"
            placeholder="Digite seu endereco"
            hasError={dataUserErro?.endereco}
          />
          <Input.HelpText
            text={dataUserErro?.endereco && '📣 ' + dataUserErro?.endereco}
          />
        </Input.Root>

        <Input.Root className="w-full md:w-6/12">
          <Input.Label label="Numero" icon={TbNumber} htmlFor="numero" />
          <Input.Content
            name="numero"
            id="numero"
            placeholder="Numero residência"
            hasError={dataUserErro?.numero}
          />
          <Input.HelpText
            text={dataUserErro?.numero && '📣 ' + dataUserErro?.numero}
          />
        </Input.Root>
      </div>
      <div className="flex flex-col sm:flex-row gap-2 my-2">
        <Input.Root>
          <Input.Label label="Bairro" icon={FaTreeCity} htmlFor="bairro" />
          <Input.Content
            name="bairro"
            id="bairro"
            placeholder="Digite seu bairro"
            hasError={dataUserErro?.bairro}
          />
          <Input.HelpText
            text={dataUserErro?.bairro && '📣 ' + dataUserErro?.bairro}
          />
        </Input.Root>
        <Input.Root>
          <Input.Label label="Cidade" icon={FaCity} htmlFor="cidade" />
          <Input.Content
            name="cidade"
            id="cidade"
            placeholder="Digite sua cidade"
            hasError={dataUserErro?.cidade}
          />
          <Input.HelpText
            text={dataUserErro?.cidade && '📣 ' + dataUserErro?.cidade}
          />
        </Input.Root>

        <Input.Root>
          <Input.Label label="Estado" icon={GiModernCity} htmlFor="estado" />
          <Input.Content
            name="estado"
            id="estado"
            placeholder="Digite seu estado"
            hasError={dataUserErro?.estado}
          />
          <Input.HelpText
            text={dataUserErro?.estado && '📣 ' + dataUserErro?.estado}
          />
        </Input.Root>
      </div>
      <div className="flex flex-col sm:flex-row gap-2 my-2">
        <Input.Root>
          <Input.Label label="Senha" icon={MdPassword} htmlFor="senha" />
          <Input.Content
            name="senha"
            id="senha"
            placeholder="Digite sua senha"
            type="password"
            hasError={dataUserErro?.senha}
          />
          <Input.HelpText
            text={dataUserErro?.senha && '📣 ' + dataUserErro?.senha}
          />
        </Input.Root>

        <Input.Root>
          <Input.Label
            label="Confirma Senha"
            icon={MdPassword}
            htmlFor="confirmaSenha"
          />
          <Input.Content
            type="password"
            name="confirmaSenha"
            id="confirmaSenha"
            placeholder="Repita sua senha"
            hasError={dataUserErro?.confirmaSenha}
          />
          <Input.HelpText
            text={
              dataUserErro?.confirmaSenha && '📣 ' + dataUserErro?.confirmaSenha
            }
          />
        </Input.Root>
      </div>
      <div className=" float-right w-1/2 mt-3 flex items-center justify-between ">
        <Button
          variant="default"
          className="mx-2 w-full max-w-sm p-2"
          type="submit"
        >
          Cancelar
        </Button>
        <Button
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
