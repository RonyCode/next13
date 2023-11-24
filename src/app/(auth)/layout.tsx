import InitializeStores from '@/stores/initializeStores';

export default function PublicLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <InitializeStores />
      {children}
    </section>
  );
}
