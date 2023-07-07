import '@/styles/globals.css';
import Navbar from '@/components/Navbar';

export default function PublicLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <Navbar />
      {children}
    </section>
  );
}
