import { Fragment } from "react";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";

export type BreadcrumbLinkType = {
  href: string;
  title: string;
};

export function Breadcrumbs({
  links,
  current,
}: {
  links: BreadcrumbLinkType[];
  current: string;
}) {
  return (
    <div className="bg-white p-4 rounded">
      <Breadcrumb>
        <BreadcrumbList>
          {links.map((link, i) => (
            <Fragment key={i}>
              <BreadcrumbItem>
                <BreadcrumbLink href={link.href} className="capitalize">
                  {link.title}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
            </Fragment>
          ))}
          <BreadcrumbItem>
            <BreadcrumbPage className="capitalize">{current}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}