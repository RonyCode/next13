'use client';

import React from 'react';

import { signOut } from 'next-auth/react';

import Button from '@/ui/Button';
import { LogOut } from 'lucide-react';

const SignOutButton = () => {
  return (
    <>
      <div>
        <Button
          onClick={(e) => {
            e.preventDefault();
            signOut({ callbackUrl: `${window.location.origin}/login` });
          }}
        >
          <LogOut />
        </Button>
      </div>
    </>
  );
};
export default SignOutButton;
