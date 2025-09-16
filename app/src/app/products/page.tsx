import { ContentWrapper } from "@/components/content-wrapper";
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

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const params = await searchParams;
  const limit = params.limit ? parseInt(params.limit) : undefined;
  const page = params.page ? parseInt(params.page) : undefined;
  const sort = params.sort ? params.sort : undefined;
  const order = params.order ? params.order : undefined;
  const query = params.search ? params.search : undefined;

  const filter: ProductsFilter = {
    limit: limit,
    page: page,
    sort,
    order,
    query: query,
  };
  const data = getProductsByFilter(filter);
  const searchTitle = query ? `Search for "${query}" yielded:` : "";
  return (
    <ContentWrapper className="flex flex-col gap-4 sm:flex-row" as="article">
      <Sidebar />
      <section className="grow ">
        <Suspense>
          <ProductsGrid title={searchTitle} productsTask={data} />
        </Suspense>
      </section>
    </ContentWrapper>
  );
}
