import '@/styles/globals.css';

import React from 'react';

import { Providers } from '@/providers';

export const metadata = {
  title: 'GSO | Login',
  description: 'página de login do aplicativo GSO'
};

export default function LoginLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-Br">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
