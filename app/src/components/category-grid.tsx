import { cn } from "@/lib/utils";
import {
  Headphones,
  Laptop,
  LucideIcon,
  Smartphone,
  Tablet,
} from "lucide-react";
import Link from "next/link";

interface CategoryCardProps {
  href?: string;
  icon: LucideIcon;
  label: string;
  className?: string;
}

const categories: CategoryCardProps[] = [
  { href: "/category/smartphones", icon: Smartphone, label: "Smartphones" },
  { href: "/category/tablets", icon: Tablet, label: "Tablets" },
  {
    href: "/category/mobile-accessories",
    icon: Headphones,
    label: "Mobile Accessories",
  },
  { href: "/category/laptops", icon: Laptop, label: "Laptops" },
];

export default function CategoryGrid() {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-bold">Categories</h2>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((category) => (
          <CategoryCard key={category.href} {...category} />
        ))}
      </div>
    </div>
  );
}

function CategoryCard({
  href,
  label,
  icon: Icon,
  className,
}: CategoryCardProps) {
  return (
    <Link
      href={href as string}
      className={cn(
        "border rounded flex flex-col items-center text-center py-4 gap-2 hover:bg-muted/40 transition-colors",
        className
      )}
    >
      <Icon size={48} strokeWidth={1} />
      <p className="text-sm">{label}</p>
    </Link>
  );
}
