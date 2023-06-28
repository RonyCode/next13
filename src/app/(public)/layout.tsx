import '@/styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';

import { Metadata } from 'next';
import { Inter } from 'next/font/google';

import '@/styles/globals.css';

import Navbar from '@/components/Navbar';
import ToastProvider from '@/providers/ToastProvider/ToastProvider';

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
