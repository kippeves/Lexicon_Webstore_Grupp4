import { ThinProduct } from "@/lib/types";
import Image from "next/image";

export default function ProductCard({ product }: { product: ThinProduct }) {
    return (
        <div className="border rounded-lg p-4 shadow hover:shadow-lg transition-shadow duration-300">
            <Image
                src={product.thumbnail}
                alt={product.title}
                className="w-full h-48 object-cover mb-4 rounded"
                width={300}
                height={300}
            />
            <h2 className="text-lg font-semibold">{product.title}</h2>
            <p className="text-lg font-bold mt-2">${product.price}</p>
        </div>
    )
}