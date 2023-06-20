import '@/styles/globals.css';
import React from 'react';

import ToastProvider from '@/context/ToastProvider';

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
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}
