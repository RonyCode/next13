import '@/styles/globals.css';
import { Providers } from '@/providers';
import InitializeStores from '@/stores/initializeStores';

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>
        <InitializeStores />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
