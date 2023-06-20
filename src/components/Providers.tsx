import React, { FC, ReactNode } from 'react';

import { SessionProvider } from 'next-auth/react';

interface ProviderProps {
  children?: ReactNode;
}

const Providers: FC<ProviderProps> = ({ children }) => {
  return (
    <>
      <SessionProvider>{children}</SessionProvider>
    </>
  );
};
export default Providers;
