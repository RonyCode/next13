import React from 'react';

import { getServerSession } from 'next-auth';
import Image from 'next/image';
import Link from 'next/link';

import SignOutButton from '@/components/SignOutButton/SignOutButton';
import { authOptions } from '@/lib/auth';

import Logo from '../../../public/images/Logo';

export default async function NavbarHome() {
  const session = await getServerSession(authOptions);
  return (
    <>
      <nav className="top-0 flex h-20 w-screen items-center justify-between bg-slate-600 text-white shadow-2xl ">
        <div className="flex w-1/2 items-center  justify-around">
          <Link href="/">
            <div>
              <Logo />
            </div>
            <Image
              className=" rounded-2xl  hover:shadow-2xl"
              src="/images/logo.svg"
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
              <div className=" flex items-center  ">
                <Link
                  href="/profile"
                  className=" mx-4 flex items-center  p-1  justify-center   shadow-lg hover:shadow-slate-400 rounded-full "
                >
                  <Image
                    className="rounded-full "
                    src={session?.image || '/images/avatar.svg'}
                    width={48}
                    height={48}
                    object-fit={'contain'}
                    alt="img profile"
                  />
                </Link>
                <SignOutButton />
              </div>
            ) : (
              <div className="gap-2 space-x-6">
                <Link href="/precadastro-usuario">Cadastrar</Link>
                <Link href="/login">Login</Link>
              </div>
            )}{' '}
          </div>
        </div>
      </nav>
    </>
  );
}
