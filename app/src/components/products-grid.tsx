"use client";
import { ThinProduct } from "@/lib/types";
import ProductCard from "./product-card";
import { use } from "react";

export default function ProductsGrid({
  productsTask,
  title,
  emptyText,
  className,
}: {
  productsTask: Promise<ThinProduct[]>;
  title?: string;
  emptyText?: string;
} & React.ComponentProps<"div">) {
  const data = use(productsTask);
  return (
    <div className={`flex flex-col gap-4 ${className || ""}`}>
      {title && <h2 className="text-3xl font-bold">{title}</h2>}
      <ul className="grid grid-rows-[1fr_auto_auto_auto] grid-cols-[repeat(auto-fill,minmax(15rem,1fr))] gap-3 justify-between">
        {data.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </ul>

      {data.length <= 0 && (
        <p className="text-center p-4">{emptyText || "No Content"}</p>
      )}
    </div>
  );
}
