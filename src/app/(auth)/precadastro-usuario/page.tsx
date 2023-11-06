import { FC } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import RegisterUserForm from '@/app/(auth)/cadastra-usuario/components/RegisterUserForm';

const CadastroUsuario: FC = async () => {
  return (
    <>
      <div className=" flex min-h-screen items-center justify-center bg-slate-800   sm:px-6 lg:px-8">
        <div className="flex w-screen flex-col items-center space-y-8 rounded bg-slate-700 px-2 py-12 text-white  xl:w-6/12">
          <div className="flex h-full min-w-full flex-col items-center gap-8  ">
            <Link href="/">
              <Image
                src="/images/logo.png"
                alt="imagem de logotipo"
                width={200}
                height={200}
              />
            </Link>
          </div>
          <RegisterUserForm />
        </div>
      </div>
    </>
  );
};

export default CadastroUsuario;