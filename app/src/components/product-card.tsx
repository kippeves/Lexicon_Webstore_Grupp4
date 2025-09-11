import { ThinProduct } from "@/lib/types";
import Image from "next/image";
import ProductPrice from "./product-price";
import StockStatus from "./stock-status";

export default function ProductCard({ product }: { product: ThinProduct }) {
    return (
        <article className="grid grid-rows-subgrid gap-3 row-span-5 border rounded-xs py-2 px-4 shadow">
            <div className="flex flex-col items-center mb-2">
                <Image
                    src={product.thumbnail}
                    alt={product.title}
                    className="w-full h-48 object-cover rounded"
                    width={300}
                    height={300}
                />
                <p className="text-sm text-gray-500">{product.rating} ⭐</p>
            </div>


            <h2 className="text-lg font-semibold">{product.title}</h2>

            <ProductPrice price={product.price} discountPercentage={product.discountPercentage} />

            <StockStatus availabilityStatus={product.availabilityStatus} />
        </article>
    )
}