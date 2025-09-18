"use client";

import { SidebarFilterValues } from "@/lib/types";
import { use } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import StockCheck from "./filter/stock-only";
import BrandSelect from "./filter/brand-select";
import NameSearch from "./filter/name-search";

export default function FilterArea({
  task,
}: {
  task: Promise<SidebarFilterValues>;
}) {
  const path = usePathname();
  const params = useSearchParams();
  const { replace } = useRouter();

  const updateRoute = (index: string, value: string | string[] | undefined) => {
    const newParams = new URLSearchParams(params);
    if (value?.length) {
      const exportValue = Array.isArray(value)
        ? value.join(",").toLowerCase()
        : value;
      newParams.set(index, exportValue);
    } else newParams.delete(index);
    replace(`${path}?${newParams}`);
  };

  const { brand } = use(task);

  return (
    <>
      <NameSearch params={params} onValueChange={updateRoute} />
      <BrandSelect
        params={params}
        values={brand}
        onSelectedUpdate={updateRoute}
      />
      <StockCheck params={params} onCheckedChange={updateRoute} />
    </>
  );
}
