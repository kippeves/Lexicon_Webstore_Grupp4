"use server";
import { getFilterValues } from "@/lib/data/products";
import Link from "next/link";
import React, { Suspense } from "react";
import FilterArea from "./filter-area";

export default async function Sidebar({ category }: { category?: string }) {
  const categories = [
    "smartphones",
    "tablets",
    "mobile-accessories",
    "laptops",
  ];

  const filterValues = getFilterValues({
    values: ["brand"],
    categories: category ? [category] : undefined,
  });

  return (
    <aside className="flex flex-col sm:w-60 w-full gap-4">
      <section className="p-4 rounded bg-gray-200 flex flex-col gap-2">
        <h2 className="text-xl font-bold uppercase">Categories</h2>
        <ul className="p-2 flex flex-col gap-1 bg-white rounded">
          {categories.map((c, index) => (
            <li key={index}>
              <Link
                href={`/category/${c}`}
                className="capitalize text-sm hover:underline"
              >
                {c}
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <section className="p-4 rounded bg-gray-200 flex flex-col gap-2">
        <h2 className="sr-only">Filters</h2>
        <Suspense>
          <FilterArea task={filterValues} />
        </Suspense>
      </section>
    </aside>
  );
}
