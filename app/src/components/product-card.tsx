import { ThinProduct } from "@/lib/types";
import Image from "next/image";

export default function ProductCard({ product }: { product: ThinProduct }) {
  //TODO: Replace price with price component when available
  return (
    <li className="grid grid-rows-subgrid gap-3 row-span-5 border rounded-xs py-2 px-4 shadow">
      <div className="flex flex-col items-center gap-2">
        <Image
          src={product.thumbnail}
          alt={product.title}
                    className="w-full object-cover rounded"
          width={300}
          height={300}
        />
                <p className="text-sm text-gray-500">{product.rating} ⭐</p>
      </div>


      <h2 className="text-lg font-semibold">{product.title}</h2>

      <div>
        <p className="text-lg font-bold">${product.price}</p>
      </div>

      <p className="text-sm text-gray-500 flex items-center gap-2">
        {product.availabilityStatus === "In Stock" ? (
          <span className="inline-flex items-center">
            <span className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center mr-1">
                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 16 16">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 8l3 3 5-5" />
              </svg>
            </span>
            In Stock
          </span>
        ) : (
          <span className="inline-flex items-center">
            <span className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center mr-1">
                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 16 16">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 5l6 6M11 5l-6 6" />
              </svg>
            </span>
            {product.availabilityStatus}
          </span>
        )}
      </p>
    </li>
    )
}