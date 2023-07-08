import '@/styles/globals.css';
import NavbarPrivate from '@/components/NavbarPrivate/NavbarPrivate';

export default function PublicLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <NavbarPrivate />
      {children}
    </section>
  );
}
