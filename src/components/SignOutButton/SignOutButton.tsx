'use client';
import React from 'react';

import { signOut } from 'next-auth/react';

import { deleteCookies } from '@/components/SignOutButton/LogoutAction';
import Button from '@/ui/Button';
import { LogOut } from 'lucide-react';

const SignOutButton = () => {
  const handleClick = async () => {
    deleteCookies();
    await signOut({
      callbackUrl: 'http://localhost:3000/login'
    });
  };

  return (
    <>
      <div>
        <Button onClick={handleClick}>
          <LogOut />
        </Button>
      </div>
    </>
  );
};
export default SignOutButton;
