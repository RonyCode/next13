import '@/styles/globals.css';
import NavbarCommon from '@/components/NavbarCommon';

export default function PublicLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <NavbarCommon />
      {children}
    </section>
  );
}
