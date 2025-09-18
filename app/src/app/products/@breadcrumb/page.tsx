import { Breadcrumbs } from "@/components/breadcrumbs";

export default function BreadcrumbSlot() {
  const links = [{ href: "/", title: "Home" }];
  return (
    <Breadcrumbs links={links} current="Products" />
  );
}
