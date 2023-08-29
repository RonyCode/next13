import React from 'react';

import Image from 'next/image';
import Link from 'next/link';

import SignOutButton from '@/components/SignOutButton/SignOutButton';

export default async function NavbarPrivate() {
  return (
    <>
      <nav className="flex h-20 w-screen items-center justify-around bg-slate-600 text-white shadow-2xl">
        <Link className=" w-auto" href="/">
          <Image
            className=" rounded-2xl hover:shadow-2xl"
            src={'/images/logo.png'}
            width={150}
            height={150}
            alt="imagem de logotipo"
            priority={true}
          />
        </Link>

        <div className="flex  flex-row justify-around ">
          <div className="mr-6"></div>
          <SignOutButton />
        </div>
      </nav>
    </>
  );
}
