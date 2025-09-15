import ProductsGrid from "@/components/products-grid";
import Sidebar from "@/components/products/sidebar";
import { getProductsByFilter } from "@/lib/data/products";
import { ProductsFilter } from "@/lib/types";
import { Metadata } from "next";
import React, { Suspense } from "react";

export const metadata: Metadata = {
  title: "Webshop - Products",
  description: "Browser our products - Find what you're looking for",
};

export default async function ProductsPage({ searchParams }: { searchParams: Promise<{ [key: string]: string | undefined }> }) {
  const params = await searchParams;
  const limit = params.limit ? parseInt(params.limit) : 12;
  const page = params.page ? parseInt(params.page) : 1;
  const query = params.search ? params.search : undefined;

  const filter: ProductsFilter = { limit: limit, page: page, query: query };
  const data = getProductsByFilter(filter);
  const searchTitle = query ? `Search for "${query}" yielded:` : '';
  return (
    <article className="flex flex-col gap-2 sm:flex-row grow bg-white p-6">
      <Sidebar />
      <section className="grow p-2">
        <Suspense>
          <ProductsGrid
            title={searchTitle}
            productsTask={data}
          />
        </Suspense>
      </section>
    </article>
  );
}
