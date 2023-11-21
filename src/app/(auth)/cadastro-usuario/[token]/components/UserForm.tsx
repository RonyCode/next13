import * as React from 'react';
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
import { useUserStore } from '../../../../../../store/userStore';

export const UserForm = async () => {
  const { email, cep, cidade, cpf, endereco, data_nascimento } =
    useUserStore.getState().user;

  return (
    <form action={submitUserForm} className="min-w-full px-4 md:px-8">
      <div className="flex flex-col sm:flex-row gap-2">
        <Input.Root>
          <Input.Label label="Nome" icon={User} htmlFor="nome" />
          <Input.Content id="nome" name="nome" placeholder="Digite seu nome" />
          <Input.HelpText text="teste" />
        </Input.Root>
      </div>
      <ul>
        <li>{email}</li>
        <li>{cep}</li>
        <li>{cidade}</li>
        <li>{cpf}</li>
        <li>{endereco}</li>
        <li>{data_nascimento}</li>
      </ul>
      <div className="flex flex-col sm:flex-row gap-2">
        <Input.Root>
          <Input.Label label="Email" icon={Mail} htmlFor="email" />
          <Input.Content
            name="email"
            id="email"
            placeholder="Digite seu email"
          />
          <Input.HelpText text="teste" />
        </Input.Root>

        <Input.Root className="w-full md:w-6/12">
          <Input.Label htmlFor="cpf" label="Cpf" icon={MdNumbers} />
          <Input.ContentMasked
            name="cpf"
            id="cpf"
            mask="___.___.___-__"
            placeholder="999.999.999-99"
          />
          <Input.HelpText text="teste" />
        </Input.Root>
      </div>
      <div className="flex flex-col sm:flex-row gap-2">
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
          />
          <Input.HelpText text="teste" />
        </Input.Root>

        <Input.Root>
          <Input.Label label="Telefone" icon={Phone} htmlFor="telefone" />
          <Input.ContentMasked
            id="telefone"
            name="telefone"
            mask="(__) _____-____"
            placeholder="(99) 99999-9999"
          />
          <Input.HelpText text="teste" />
        </Input.Root>
        <Input.Root>
          <Input.Label label="Cep" icon={MdNumbers} htmlFor="cep" />
          <Input.ContentMasked
            name="cep"
            id="cep"
            mask="_____-___"
            placeholder="99999-999"
          />
          <Input.HelpText text="teste" />
        </Input.Root>
      </div>
      <div className="flex flex-col sm:flex-row gap-2">
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
          />
          <Input.HelpText text="teste" />
        </Input.Root>

        <Input.Root className="w-full md:w-6/12">
          <Input.Label label="Numero" icon={TbNumber} htmlFor="numero" />
          <Input.Content
            name="numero"
            id="numero"
            placeholder="Numero residência"
          />
          <Input.HelpText text="teste" />
        </Input.Root>
      </div>
      <div className="flex flex-col sm:flex-row gap-2">
        <Input.Root>
          <Input.Label label="Bairro" icon={FaTreeCity} htmlFor="bairro" />
          <Input.Content
            name="bairro"
            id="bairro"
            placeholder="Digite seu bairro"
          />
          <Input.HelpText text="teste" />
        </Input.Root>
        <Input.Root>
          <Input.Label label="Cidade" icon={FaCity} htmlFor="cidade" />
          <Input.Content
            name="cidade"
            id="cidade"
            placeholder="Digite sua cidade"
          />
          <Input.HelpText text="teste" />
        </Input.Root>

        <Input.Root>
          <Input.Label label="Estado" icon={GiModernCity} htmlFor="estado" />
          <Input.Content
            name="estado"
            id="estado"
            placeholder="Digite seu estado"
          />
          <Input.HelpText text="teste" />
        </Input.Root>
      </div>
      <div className="flex flex-col sm:flex-row gap-2">
        <Input.Root>
          <Input.Label label="Senha" icon={MdPassword} htmlFor="senha" />
          <Input.Content
            name="senha"
            id="senha"
            placeholder="Digite sua senha"
            type="password"
          />
          <Input.HelpText text="teste" />
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
          />
          <Input.HelpText text="teste" />
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
