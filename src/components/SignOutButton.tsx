'use client';
import React from 'react';

import { signOut } from 'next-auth/react';
import Link from 'next/link';

import Button from '@/ui/Button';
import { LogOut } from 'lucide-react';

const SignOutButton = () => {
  return (
    <>
      <div>
        <Button
          onClick={(e) => {
            e.preventDefault();
            signOut({ callbackUrl: 'http://localhost:3000/login' });
          }}
        >
          <LogOut />
        </Button>
      </div>
    </>
  );
};
export default SignOutButton;
