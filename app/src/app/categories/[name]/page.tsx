import ProductsGrid from "@/components/products-grid";
import Sidebar from "@/components/products/sidebar";
import { ProductList } from "@/lib/types";
import { notFound } from "next/navigation";
import React from "react";

export default async function CategoryDetailsPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
  const categories = [
    "all",
    "smartphones",
    "tablets",
    "mobile-accessories",
    "laptops",
  ]
  const [, ...values] = categories;
  if (!values.includes(name)) return notFound();

  // TODO: Insert updated getProducts here.
  const productList = new Promise<ProductList>((resolve) => {
    const data = {
      products: [],
      limit: 0,
      skip: 0,
      total: 0,
    } as ProductList;
    return resolve(data);
  });

  return (
    <div className="bg-white rounded p-4 flex flex-col">
      <h2 className="text-2xl capitalize p-2">Category: {name}</h2>
      <p className="flex gap-2 p-4 justify-evenly text-justify ">
        <span className="w-1/3">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quo
          provident, itaque facere soluta nihil corporis ut magni ipsum? Nihil,
          ut repellat ipsum saepe consectetur eius hic minima iste nemo
          voluptatibus!
        </span>
        <span className="w-1/3">
          Corporis accusantium nulla, harum, ullam ab optio veritatis ipsa
          recusandae maiores ut illo quas laudantium nemo autem mollitia vel
          quam tempore. Amet tempore ducimus blanditiis provident omnis a?
          Voluptates, ea!
        </span>
      </p>
      <div className="flex grow  gap-4">
        <Sidebar />
        <ProductsGrid className="grow" productsTask={productList} />
      </div>
    </div>
  );
}
