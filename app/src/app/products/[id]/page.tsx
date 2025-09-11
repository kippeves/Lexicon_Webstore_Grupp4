import React from "react";
import { getProduct } from "@/lib/data/products";
import Image from "next/image";
import ProductPrice from "@/components/product-price";
import StockStatus from "@/components/stock-status";
import Separator from "@/components/ui/separator";

export default async function ProductPage(props: { params: Promise<{ [key: string]: string | undefined }> }) {
  const params = await props.params;
  const productId = params.id ? Number(params.id) : undefined;


  if (typeof productId !== "number" || isNaN(productId)) {
    return <div>Invalid product ID</div>;
  }
  const product = await getProduct(productId);

  return (
    <div className="flex flex-row gap-4 p-4 bg-white rounded-lg">
      <div className="flex-shrink-0">
        <Image src={product.images[0]} alt={product.title} width={500} height={500} />
      </div>
      
      <div className="flex flex-col gap-2 flex-grow mt-2">
        <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
        <p className="text-lg font-semibold mb-2">Rating: {product.rating} ⭐</p>
        <ProductPrice price={product.price} discountPercentage={product.discountPercentage} />
        <p className="text-md  mb-2">Description: {product.description}</p>
        <Separator />
        <p className="text-lg font-semibold mb-2">Brand: {product.brand}</p>
        <StockStatus availabilityStatus={product.availabilityStatus} />

        <div className="flex flex-col ml-auto justify-between">
          <button className="bg-blue-500 text-white px-4 py-2 rounded mb-2 hover:bg-blue-600">Add to Cart</button>
          <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Buy Now</button>
        </div>

        <p className="text-sm font-semibold">SKU: <span className="text-sm text-gray-500">{product.sku}</span></p>
        <p className="text-sm font-semibold">CATEGORY: <span className="text-sm text-gray-500">{product.category}</span></p>
        <p className="text-sm font-semibold">TAGS: <span className="text-sm text-gray-500">{product.tags.join(", ")}</span></p>
      </div>

    </div>
  );
}