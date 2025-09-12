import ProductsGrid from "@/components/products-grid";
import { searchByName } from "@/lib/data/products";
import React from "react";

export default function ProductsPage() {
  const searchTerm = "phone";
  const search = searchByName({ name: searchTerm });
  return (
    <div className="p-2">
      <ProductsGrid title={`Search for "${searchTerm}" yielded:`} productsTask={search} />
    </div>
  );
}
