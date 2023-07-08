import '@/styles/globals.css';
import NavbarHome from '@/components/NavbarHome/NavbarHome';

export default function PublicLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <NavbarHome />
      {children}
    </section>
  );
}
