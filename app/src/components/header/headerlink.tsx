"use client";
import { usePathname } from "next/navigation";
import { NavigationMenuLink } from "../ui/navigation-menu";
import Link from "next/link";

export const HeaderLink = ({
  href,
  children,
  ...props
}: {
  href: string;
  children: React.ReactNode;
  props?: React.HTMLAttributes<HTMLElement>;
}) => {
  const pathname = usePathname();
  const isActive = href === pathname;

  return (
    <NavigationMenuLink
      asChild
      className={`text-md hover:bg-gray-300 ${
        isActive && "underline border-dashed"
      }`}
    >
      <Link href={href} className="font-bold" {...props}>
        {children}
      </Link>
    </NavigationMenuLink>
  );
};
