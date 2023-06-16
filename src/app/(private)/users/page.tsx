import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

import { authOptions } from '@/lib/auth';

const Users = async () => {
  const session = await getServerSession(authOptions);

  // if (!session?.status?.authorized) {
  //   redirect('/login');
  // }

  return (
    <>
      <section>
        <div>
          <h1>Essa página é protegida</h1>
          <h2>Logado no sistema como:</h2>
          <p>{session?.id}</p>
          <p>{session?.name}</p>
          <p>{session?.email}</p>
        </div>
      </section>
    </>
  );
};
export default Users;
