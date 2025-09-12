import Link from "next/link";
import React from "react";

export default function Sidebar() {
  const categories = [
    "smartphones",
    "tablets",
    "mobile-accessories",
    "laptops",
  ];
  return (
    <aside className="flex flex-col sm:w-60 w-full gap-4">
      <section className="p-4 rounded bg-gray-200 flex flex-col gap-2">
        <h2 className="text-xl font-bold uppercase">Categories</h2>
        <ul className="p-2 flex flex-col gap-1 bg-white rounded">
          {categories.map((c, index) => (
            <li key={index}>
              <Link href={`category/${c}`} className="capitalize text-sm hover:underline">
                {c}
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <section className="p-4 rounded bg-gray-200 flex flex-col gap-2">
        <h2 className="text-xl font-bold uppercase">Categories</h2>
        <div className="bg-white rounded p-2">All filters go here.</div>
      </section>
    </aside>
  );
}
