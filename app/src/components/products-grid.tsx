import { ThinProduct } from "@/lib/types";
import ProductCard from "./product-card";

export default function ProductsGrid({ products, title }: { products: ThinProduct[], title?: string }
) {
    return (
        <div>
            {title ? <h2 className="mb-4 font-bold">{title}</h2> : ''}
            <ul className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] justify-center gap-2">
                {products.map((product) => (
                    <li key={product.id}>
                        <ProductCard product={product}></ProductCard>
                    </li>
                ))}
            </ul>
        </div>
    );
}