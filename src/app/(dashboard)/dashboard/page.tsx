import React from 'react';

import { getServerSession } from 'next-auth';
import Image from 'next/image';

import Button from '@/components/ui/Button';
import { authOptions } from '@/lib/auth';
import { LogOut } from 'lucide-react';

const Dashboard = async () => {
  const session = await getServerSession(authOptions);
  return (
    <div>
      <section className=" h-screen w-screen bg-slate-800">
        <div className="h-full bg-amber-50 md:container md:mx-auto">
          {' '}
          {session?.name}
          <br /> {session?.nome}
          <br /> {session?.cod_usuario}
          <br /> {session?.token}
          <br />
          {session?.email}
        </div>
      </section>
    </div>
  );
};
export default Dashboard;
