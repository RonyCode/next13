export const dataServerUser = (data: string) => {
  return data;
};

// 'use client';
//
// import * as React from 'react';
// import { useState, useTransition } from 'react';
// import { FaBirthdayCake, FaCity, FaRegAddressCard } from 'react-icons/fa';
// import { FaTreeCity } from 'react-icons/fa6';
// import { GiModernCity } from 'react-icons/gi';
// import { MdNumbers, MdPassword } from 'react-icons/md';
// import { SiOpenstreetmap } from 'react-icons/si';
// import { TbNumber } from 'react-icons/tb';
//
// import { registerUserServerActions } from '@/app/(auth)/cadastro-usuario/[token]/actions/registerUserServerAction';
// import { UserForm } from '@/app/(auth)/cadastro-usuario/[token]/components/UserForm';
// import { useFormRegister } from '@/app/(auth)/cadastro-usuario/[token]/hooks/useFormRegister';
// import { useRegister } from '@/app/(auth)/cadastro-usuario/[token]/hooks/useRegister/useRegister';
// import { RegisterUserSchema } from '@/app/(auth)/cadastro-usuario/[token]/schemas/RegisterUserSchema';
// import { Input } from '@/components/Form/Input';
// import { useCep } from '@/hooks/useCep';
// import Button from '@/ui/Button';
// import debounce from 'lodash.debounce';
// import { Mail, User, Phone } from 'lucide-react';
//
// import { submitUserForm } from '../../../../../../actions/userActions';

// const DataServerUser = () => {
//   const { findCep } = useCep();
//   const { errors, register } = useFormRegister();
//   const [pending, startTransition] = useTransition();
//
//   const hasError =
//     (errors.email?.message?.length && errors.email?.message?.length > 0) ||
//     (errors.senha?.message?.length && errors.senha?.message?.length > 0) ||
//     (errors.endereco?.message?.length &&
//       errors.endereco?.message?.length > 0) ||
//     (errors.cpf?.message?.length && errors.cpf?.message?.length > 0) ||
//     (errors.telefone?.message?.length &&
//       errors.telefone?.message?.length > 0) ||
//     (errors.confirmaSenha?.message?.length &&
//       errors.confirmaSenha?.message?.length > 0);
//   return (
//     <>
//       <div className=" w-full gap-12 p-2 md:p-8 ">
//         <UserForm />
//         <form action={submitUserForm}>
//           <div className="flex flex-col sm:flex-row gap-2">
//             <Input.Root className="mb-2 w-full">
//               <Input.ContentMasked
//                 {...register('cpf')}
//                 label="Cpf"
//                 icon={FaRegAddressCard}
//                 name="cpf"
//                 mask="___.___.___-__"
//                 placeholder="Digite seu email"
//                 hasError={errors.cpf?.message}
//               />
//               <Input.HelpText
//                 text={errors.cpf?.message && '📣 ' + errors.cpf?.message}
//               />
//             </Input.Root>
//             <Input.Root className="mb-2 w-48">
//               <Input.ContentMasked
//                 {...register('data_nascimento')}
//                 label="Nascimento"
//                 icon={FaBirthdayCake}
//                 mask="__/__/____"
//                 name="data_nascimento"
//                 placeholder="99/99/9999"
//                 hasError={errors.data_nascimento?.message}
//               />
//               <Input.HelpText
//                 text={
//                   errors.data_nascimento?.message &&
//                   '📣 ' + errors.data_nascimento?.message
//                 }
//               />
//             </Input.Root>
//           </div>
//           <div className="flex flex-col sm:flex-row gap-2">
//             <Input.Root className="mb-2 w-full">
//               <Input.Content
//                 {...register('email')}
//                 label="Email"
//                 icon={Mail}
//                 name="email"
//                 placeholder="Digite seu email"
//                 hasError={errors.email?.message}
//               />
//               <Input.HelpText
//                 text={errors.email?.message && '📣 ' + errors.email?.message}
//               />
//             </Input.Root>
//           </div>
//           <div className="flex flex-col sm:flex-row gap-2">
//             <Input.Root className="mb-2 w-full">
//               <Input.Content
//                 {...register('nome')}
//                 label="Nome"
//                 icon={User}
//                 name="nome"
//                 placeholder="Digite seu nome"
//                 hasError={errors.nome?.message}
//               />
//               <Input.HelpText
//                 text={errors.nome?.message && '📣 ' + errors.nome?.message}
//               />
//             </Input.Root>
//             <Input.Root className="mb-2 w-48">
//               <Input.ContentMasked
//                 {...register('telefone')}
//                 label="Telefone"
//                 icon={Phone}
//                 name="telefone"
//                 mask="(__) ____-____"
//                 placeholder="Digite seu telefone"
//                 hasError={errors.telefone?.message}
//               />
//               <Input.HelpText
//                 text={
//                   errors.telefone?.message && '📣 ' + errors.telefone?.message
//                 }
//               />
//             </Input.Root>
//           </div>
//           <div className="flex flex-col sm:flex-row gap-2">
//             <Input.Root className="mb-2 w-48">
//               <Input.ContentMasked
//                 {...register('cep')}
//                 label="Cep"
//                 icon={MdNumbers}
//                 name="cep"
//                 mask="_____-___"
//                 placeholder="99999-999"
//                 hasError={errors.cep?.message}
//               />
//               <Input.HelpText
//                 text={errors.cep?.message && '📣 ' + errors.cep?.message}
//               />
//             </Input.Root>
//
//             <Input.Root className="mb-2 w-full">
//               <Input.Content
//                 {...register('endereco')}
//                 label="Endereço"
//                 icon={SiOpenstreetmap}
//                 name="endereco"
//                 placeholder="Digite seu endereco"
//                 hasError={errors.endereco?.message}
//               />
//               <Input.HelpText
//                 text={
//                   errors.endereco?.message && '📣 ' + errors.endereco?.message
//                 }
//               />
//             </Input.Root>
//           </div>
//
//           <div className="flex flex-col sm:flex-row gap-2">
//             <Input.Root className="mb-2 w-full">
//               <Input.Content
//                 {...register('bairro')}
//                 label="Bairro"
//                 icon={FaTreeCity}
//                 name="bairro"
//                 placeholder="Digite seu bairro"
//                 hasError={errors.bairro?.message}
//               />
//               <Input.HelpText
//                 text={errors.bairro?.message && '📣 ' + errors.bairro?.message}
//               />
//             </Input.Root>
//             <Input.Root className="mb-2 w-48">
//               <Input.Content
//                 {...register('numero')}
//                 label="Numero"
//                 icon={TbNumber}
//                 name="numero"
//                 placeholder="Numero residência"
//                 hasError={errors.numero?.message}
//               />
//               <Input.HelpText
//                 text={errors.numero?.message && '📣 ' + errors.numero?.message}
//               />
//             </Input.Root>
//           </div>
//
//           <div className="flex flex-col sm:flex-row gap-2">
//             <Input.Root className="mb-2 w-full">
//               <Input.Content
//                 {...register('cidade')}
//                 label="Cidade"
//                 icon={FaCity}
//                 name="cidade"
//                 placeholder="Digite sua cidade"
//                 hasError={errors.cidade?.message}
//               />
//               <Input.HelpText
//                 text={errors.cidade?.message && '📣 ' + errors.cidade?.message}
//               />
//             </Input.Root>
//
//             <Input.Root className="mb-2 w-full">
//               <Input.Content
//                 {...register('estado')}
//                 label="Estado"
//                 icon={GiModernCity}
//                 name="estado"
//                 placeholder="Digite seu estado"
//                 hasError={errors.estado?.message}
//               />
//               <Input.HelpText
//                 text={errors.estado?.message && '📣 ' + errors.estado?.message}
//               />
//             </Input.Root>
//           </div>
//           <div className="flex flex-col sm:flex-row gap-2">
//             <Input.Root className="mb-2 w-full">
//               <Input.Content
//                 {...register('senha')}
//                 icon={MdPassword}
//                 label="Senha"
//                 name="senha"
//                 placeholder="Digite sua senha"
//                 type="password"
//                 hasError={errors.senha?.message}
//               />
//               <Input.HelpText
//                 text={errors.senha?.message && '📣 ' + errors.senha?.message}
//               />
//             </Input.Root>
//
//             <Input.Root className="mb-2 w-full">
//               <Input.Content
//                 {...register('confirmaSenha')}
//                 label="Confirma senha"
//                 type="password"
//                 icon={MdPassword}
//                 name="confirmaSenha"
//                 placeholder="Repita sua senha"
//                 hasError={errors.confirmaSenha?.message}
//               />
//               <Input.HelpText
//                 text={
//                   errors.confirmaSenha?.message &&
//                   '📣 ' + errors.confirmaSenha?.message
//                 }
//               />
//             </Input.Root>
//           </div>
//           <div className="mt-3 flex items-center justify-between ">
//             <Button
//               isLoading={pending}
//               disabled={hasError || pending}
//               variant="default"
//               className="mr-2 w-full max-w-sm p-2"
//               type="submit"
//             >
//               Cancelar
//             </Button>
//             <Button
//               isLoading={pending}
//               disabled={hasError || pending}
//               variant="default"
//               className="mr-2 w-full max-w-sm p-2 focus:ring-opacity-50"
//               type="submit"
//             >
//               Cadastrar
//             </Button>
//           </div>
//         </form>
//       </div>
//     </>
//   );
// };
// export default DataServerUser;
