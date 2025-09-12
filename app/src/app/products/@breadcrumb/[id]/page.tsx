import {
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { getProduct, getThinProduct } from "@/lib/data/products";
import { Fragment } from "react";

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

  const links = [
    {
      href: "/",
      title: "Home",
    },
    { href: "/products", title: "Products" },
  ];

  const product = await getThinProduct(idVal);

  return (
    <div className="bg-white p-4 rounded">
      <BreadcrumbList>
        {links.map((link, i) => {
          return (
            <Fragment key={i}>
              <BreadcrumbItem>
                <BreadcrumbLink href={link.href}>{link.title}</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
            </Fragment>
          );
        })}
        <BreadcrumbItem>
          <BreadcrumbPage className="capitalize">
            {product.title}
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </div>
  );
}
