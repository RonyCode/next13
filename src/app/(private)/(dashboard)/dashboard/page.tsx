import React from 'react';

import { getServerSession } from 'next-auth';

import { authOptions } from '@/lib/auth';

const Dashboard = async () => {
  const session = await getServerSession(authOptions);
  return (
    <div>
      <section className=" h-screen w-screen bg-slate-800">
        <div className="h-full bg-amber-50 text-black md:container md:mx-auto ">
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
