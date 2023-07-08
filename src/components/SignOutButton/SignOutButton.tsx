'use client';
import React from 'react';

import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import { deleteCookies } from '@/components/SignOutButton/LogoutAction';
import Button from '@/ui/Button';
import { LogOut } from 'lucide-react';
const SignOutButton = () => {
  return (
    <>
      <div>
        <Button
          onClick={async () => {
            await signOut({ callbackUrl: '/login' });
            await deleteCookies();
          }}
        >
          <LogOut />
        </Button>
      </div>
    </>
  );
};
export default SignOutButton;
