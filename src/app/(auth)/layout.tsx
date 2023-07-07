import '@/styles/globals.css';

export default function PublicLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return <section>{children}</section>;
}
