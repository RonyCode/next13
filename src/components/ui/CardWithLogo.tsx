import * as React from 'react';

import Image from 'next/image';
import Link from 'next/link';

export const CardWithLogo = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className=" flex min-h-screen items-center justify-center bg-slate-800 sm:px-6 lg:px-8 ">
        <div className="flex w-full flex-col items-center space-y-8 rounded bg-slate-700 py-4 xl:py-8 text-white  xl:w-7/12">
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
          {children}
          <div className="text-center text-xs text-gray-500">
            &copy;2024 RCode All rights reserved.
          </div>
        </div>
      </div>
    </>
  );
};
