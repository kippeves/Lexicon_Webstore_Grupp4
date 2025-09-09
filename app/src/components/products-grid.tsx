import { ThinProduct } from "@/lib/types";

export default function ProductsGrid({ products }: { products: ThinProduct }) {
    return (
        <ul className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] justify-center gap-4"></ul>
    );
}