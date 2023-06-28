import { FC } from 'react';
import 'react-toastify/dist/ReactToastify.css';

import Image from 'next/image';

import LoginForm from '@/app/(auth)/login/components/LoginForm';

const Page: FC = () => {
  return (
    <>
      <div className=" flex min-h-screen items-center justify-center bg-slate-800 px-4  sm:px-6 lg:px-8">
        <div className="min-w-md flex w-6/12 flex-col items-center space-y-8 rounded bg-slate-700 py-12 text-white">
          <div className="flex h-full w-full flex-col items-center gap-8  ">
            <Image
              src="/images/logo.png"
              alt="imagem de logotipo"
              width={200}
              height={200}
            />
          </div>
          <LoginForm />
        </div>
      </div>
    </>
  );
};

export default Page;
