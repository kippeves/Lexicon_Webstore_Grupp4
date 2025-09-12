import Breadcrumbs from "@/components/breadcrumbs";
import Sidebar from "@/components/products/sidebar";

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Breadcrumbs />
      <article className="flex flex-col gap-2 sm:flex-row grow bg-white p-6">
        <Sidebar />
        <section className="grow">{children}</section>
      </article>
    </>
  );
}
