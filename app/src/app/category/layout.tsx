export default function CategoryLayout({
  breadcrumb,
  children,
}: {
  breadcrumb: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <>
      {breadcrumb}
      {children}
    </>
  );
}
