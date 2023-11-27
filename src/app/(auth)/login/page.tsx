import { FC } from 'react';

import LoginForm from '@/app/(auth)/login/components/LoginForm';
import { CardWithLogo } from '@/ui/CardWithLogo';

const Page: FC = async () => {
  return (
    <>
      <CardWithLogo>
        <LoginForm />
      </CardWithLogo>
    </>
  );
};

export default Page;
