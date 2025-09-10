"use client"
import { ThinProduct } from "@/lib/types";
import ProductCard from "./product-card";
import { use } from "react";

export default function ProductsGrid(
    { productsTask, title, emptyText = "Inga produkter hittades.", className }:
        { productsTask: Promise<ThinProduct[]>, title?: string, emptyText?: string, className?: string }
) {
    const data = use(productsTask);
    return (
        <div className={className}>
            {title ? <h2 className="mb-4 font-bold">{title}</h2> : ''}
            <ul className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] justify-center gap-2">
                {data.map((product) => (
                    <li key={product.id}>
                        <ProductCard product={product}></ProductCard>
                    </li>
                ))}
            </ul>
            {data.length <= 0 ?
                <p className="text-center p-4">{emptyText}</p>
                : ''
            }
        </div>
    );
}