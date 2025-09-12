import Sidebar from "@/components/products/sidebar";

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
      <article className="flex flex-col gap-2 sm:flex-row grow bg-white p-6">
        <Sidebar />
        <section className="grow">{children}</section>
      </article>
    </>
  );
}
