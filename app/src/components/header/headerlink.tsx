"use client";
import { usePathname } from "next/navigation";
import {
  NavigationMenuLink,
} from "../ui/navigation-menu";
import Link from "next/link";
import { cn } from "@/lib/utils";

export const HeaderLink = ({
  href,
  dropdown,
  children,
  ...props
}: {
  href: string;
  dropdown?: boolean;
  children: React.ReactNode;
  props?: React.HTMLAttributes<HTMLElement>;
}) => {
  const pathname = usePathname();
  const isActive = href === pathname ;

  return (
    <NavigationMenuLink
      asChild
      className={cn(
        "px-4 font-bold text-muted-foreground",
        isActive && "text-black",
        dropdown ? (isActive ? "font-bold" : "font-medium") : "font-bold"
      )}
    >
      <Link href={href} className="" {...props}>
        {children}
      </Link>
    </NavigationMenuLink>
  );
};
