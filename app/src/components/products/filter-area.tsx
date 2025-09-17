"use client";

import { SidebarFilterValues } from "@/lib/types";
import { use } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import StockCheck from "./filter/stock-only";
import BrandSelect from "./filter/brand-select";

export default function FilterArea({
  task,
}: {
  task: Promise<SidebarFilterValues>;
}) {
  const { brand } = use(task);
  const path = usePathname();
  const params = useSearchParams();
  const { replace } = useRouter();

  const updateRoute = (index: string, value: string | string[] | undefined) => {
    const newParams = new URLSearchParams(params);
    if (value?.length)
      newParams.set(
        index,
        Array.isArray(value) ? value.join(",").toLowerCase() : value
      );
    else newParams.delete(index);
    replace(decodeURIComponent(`${path}?${newParams}`));
  };

  return (
    <>
      {brand && (
        <BrandSelect
          params={params}
          options={brand}
          onSelectedUpdate={updateRoute}
        />
      )}
      <StockCheck params={params} onCheckedChange={updateRoute} />
    </>
  );
}
