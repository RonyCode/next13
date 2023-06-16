import React, { FC, ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';

import { SessionProvider } from 'next-auth/react';

interface ProviderProps {
  children?: ReactNode;
}

const Providers: FC<ProviderProps> = ({ children }) => {
  return (
    <>
      <SessionProvider>
        <Toaster position="top-center" reverseOrder={false} />
        {children}
      </SessionProvider>
    </>
  );
};
export default Providers;
