export default function ProductsLayout({
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
