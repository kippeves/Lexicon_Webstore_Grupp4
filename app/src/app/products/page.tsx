import ProductsGrid from "@/components/products-grid";
import Sidebar from "@/components/products/sidebar";
import { searchByName } from "@/lib/data/products";
import { Metadata } from "next";
import React, { Suspense } from "react";

export const metadata: Metadata = {
  title: "Webshop - Products",
  description: "Browser our products - Find what you're looking for",
};

export default function ProductsPage() {
  const searchTerm = "phone";
  const search = searchByName({ name: searchTerm });
  return (
    <article className="flex flex-col gap-2 sm:flex-row grow bg-white p-6">
      <Sidebar />
      <section className="grow p-2">
        <Suspense>
          <ProductsGrid
            title={`Search for "${searchTerm}" yielded:`}
            productsTask={search}
          />
        </Suspense>
      </section>
    </article>
  );
}
