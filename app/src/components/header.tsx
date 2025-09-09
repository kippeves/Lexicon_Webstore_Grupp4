import logo from "../../public/next.svg";
import Image from "next/image";
import Link from "next/link";
import { Menu } from "lucide-react";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "./ui/navigation-menu";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";

export default function Header() {
    const nav = [
        { "slug": [""], "label": "Home" },
        { "slug": ["products"], "label": "Products" },
        { "slug": ["about"], "label": "About Us" },
        { "slug": ["contact"], "label": "Contact" }
    ];

    return (
        <header className="flex flex-row-3 p-5 justify-start items-center rouned bg-white">
            <Image src={logo} width={180} height={38} alt="Site logo" className="mr-10"></Image>
            <NavigationMenu className="hidden sm:block">
                <NavigationMenuList>
                    {nav.map((item, index) => (
                        <NavigationMenuItem key={index}>
                            <NavigationMenuLink asChild className="text-md hover:bg-gray-300">
                                <Link href={`/${item.slug[0]}`} className="font-bold">{item.label}</Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                    ))}
                </NavigationMenuList>
            </NavigationMenu>
            <div className="ml-auto sm:hidden">
                <DropdownMenu>
                    <DropdownMenuTrigger className="rounded-md cursor-pointer data-[state=open]:bg-gray-300"><Menu width={38} height={38} /></DropdownMenuTrigger>
                    <DropdownMenuContent className="min-w-screen mt-2 font-bold">
                        {nav.map((item, index) => (
                            <DropdownMenuItem key={index} className="rouned-md data-highlighted:bg-gray-300">
                                <Link href={`/${item.slug[0]}`} className="p-4 w-full text-xl">{item.label}</Link>
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    );
}