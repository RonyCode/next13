import '@/styles/globals.css';

import { Metadata } from 'next';
import { Inter } from 'next/font/google';

import '@/styles/globals.css';

import Navbar from '@/components/Navbar';
import Providers from '@/components/Providers';
import ToastProvider from '@/context/ToastProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Home | GSO',
  description: 'aplicativo para administrar pessoas'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <ToastProvider>
          <Navbar />
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}
