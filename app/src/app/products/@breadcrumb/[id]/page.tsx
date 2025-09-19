import { Breadcrumbs } from "@/components/breadcrumbs";
import { getProduct } from "@/lib/data/products";

export default async function BreadcrumbSlot({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const idVal = Number(id);
  if (isNaN(idVal)) {
    return <></>;
  }

  const product = await getProduct(idVal);

  const links = [
    {
      href: "/",
      title: "Home",
    },
    { href: "/products", title: "Products" },
  ];

  if (product.category) {
    links.push({
      href: `/category/${product.category}`,
      title: product.category.replace(/-/g, " "),
    });
  }

  return (
    <Breadcrumbs links={links} current={product.title} />
  );
}
