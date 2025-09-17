import { ContentWrapper } from "@/components/content-wrapper";
import ProductsGrid from "@/components/products-grid";
import Sidebar from "@/components/products/sidebar";
import {
  convertProductParamsToFilter,
  getProductsByFilter,
} from "@/lib/data/products";
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

  const filter = convertProductParamsToFilter({ params });

  const data = getProductsByFilter(filter);
  const searchTitle = filter.query
    ? `Search for "${filter.query}" yielded:`
    : "";
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
