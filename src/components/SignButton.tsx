import { getServerSession } from 'next-auth';
import { signIn, signOut } from 'next-auth/react';

import { authOptions } from '@/lib/auth';
import Button from '@/ui/Button';
import { LogOut } from 'lucide-react';

const SignButton = async () => {
  const session = await getServerSession(authOptions);

  if (session && session.user) {
    return (
      <>
        <div className="mr-6">{session?.user?.name}</div>
        <Button onClick={() => signOut()} className="ml-6">
          <LogOut />
        </Button>
      </>
    );
  }
  return <Button onClick={() => signIn()}>Sign In</Button>;
};
export default SignButton;
