'use client';
import React from 'react';
import { FaSignOutAlt } from 'react-icons/fa';

import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import { deleteCookies } from '@/components/SignOutButton/LogoutAction';
import Button from '@/ui/Button';

const SignOutButton = () => {
  const router = useRouter();
  const handleClick = async () => {
    deleteCookies();
    await signOut({
      redirect: false
    });
    router.push('/');
  };

  return (
    <>
      <div>
        <Button onClick={handleClick}>
          <FaSignOutAlt
            size={32}
            className=" transition duration-0 ease-in-out hover:scale-110 hover:text-slate-300 hover:duration-300"
          />
        </Button>
      </div>
    </>
  );
};
export default SignOutButton;
