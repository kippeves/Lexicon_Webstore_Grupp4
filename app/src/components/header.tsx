import logo from "../../public/next.svg";
import Image from "next/image";
import Link from "next/link";
import { Menu } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "./ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { HeaderLink } from "./header/headerlink";
import HeaderCartButton from "./header/header-cart-button";
import HeaderUserButton from "./header/header-user-button";

export default function Header() {
  const nav = [
    { slug: [""], label: "Home" },
    { slug: ["products"], label: "Products" },
    { slug: ["about"], label: "About" },
    { slug: ["contact"], label: "Contact" },
  ];

  return (
    <header className="flex flex-row p-5 justify-start items-center bg-white h-fit">
      <Image
        src={logo}
        width={180}
        height={38}
        alt="Site logo"
        className="mr-10"
      ></Image>
      <NavigationMenu className="hidden sm:block">
        <NavigationMenuList>
          {nav.map((item, index) => (
            <NavigationMenuItem key={index}>
              <HeaderLink href={`/${item.slug[0]}`}>{item.label}</HeaderLink>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
      <section className="ml-auto flex flex-row">
        <HeaderUserButton />
        <DropdownMenu>
          <DropdownMenuTrigger className="sm:hidden px-2 ml-2 rounded-md cursor-pointer data-[state=open]:bg-gray-300">
            <Menu width={38} height={38} />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="min-w-screen mt-2">
            {nav.map((item, index) => (
              <DropdownMenuItem
                key={index}
                asChild
                className="rouned-md data-highlighted:bg-gray-300"
              >
                <Link
                  href={`/${item.slug[0]}`}
                  className="p-4 w-full font-bold text-xl"
                >
                  {item.label}
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <HeaderCartButton />
      </section>
    </header>
  );
}
