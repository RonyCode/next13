import React from 'react';

import { getServerSession } from 'next-auth';
import Image from 'next/image';
import Link from 'next/link';

import SignOutButton from '@/components/SignOutButton/SignOutButton';
import { authOptions } from '@/lib/auth';

export default async function Navbar() {
  const session = await getServerSession(authOptions);
  return (
    <>
      <nav className="top-0 flex h-20 w-screen items-center justify-between bg-slate-600 text-white shadow-2xl ">
        <div className="flex w-1/2 items-center  justify-around">
          <Link href="/">
            <Image
              className=" rounded-2xl  hover:shadow-2xl"
              src="/images/logo.png"
              width={150}
              height={150}
              alt="imagem de logotipo"
            />
          </Link>
        </div>
        <div className="flex w-1/2 items-center justify-around ">
          <ul className="flex w-[50%] justify-evenly ">
            <Link className="hover:text-white/90" href="/dashboard">
              Dashboard
            </Link>
            <Link className="hover:text-white/90" href="/contact">
              Contato
            </Link>
            <Link className="hover:text-white/90" href="/about">
              Sobre
            </Link>
          </ul>
          <div className="flex items-center">
            {session?.nome ? (
              <div className=" flex items-center ">
                <Link href="/profile" className=" mx-4 flex">
                  <Image
                    className="rounded-full  shadow-lg hover:shadow-slate-400"
                    src={session?.image || '/images/logo.png'}
                    width={48}
                    height={48}
                    alt="img profile"
                  />
                </Link>
                <SignOutButton />
              </div>
            ) : (
              <Link href="/login">Login</Link>
            )}{' '}
          </div>
        </div>
      </nav>
    </>
  );
}
