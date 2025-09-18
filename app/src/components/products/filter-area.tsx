"use client";

import { SidebarFilterValues } from "@/lib/types";
import { use } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import StockCheck from "./filter/stock-only";
import BrandSelect from "./filter/brand-select";
import PriceSlider from "./filter/price-slider";

export default function FilterArea({
  task,
}: {
  task: Promise<SidebarFilterValues>;
}) {
  const path = usePathname();
  const params = useSearchParams();
  const { replace } = useRouter();

  const updateRoute = (index: string | string[], value: string | string[] | undefined) => {
    const newParams = new URLSearchParams(params);
    if (Array.isArray(index)) {
      // Set multiple at once
      const vals = (Array.isArray(value)) ? value : [value];
      vals.map((val, ind) => {
        if (val?.length) {
          newParams.set(index[ind], val);
        } else {
          newParams.delete(index[ind]);
        }
      });
    }
    else if (value?.length) {
      const exportValue = Array.isArray(value)
        ? value.join(",").toLowerCase()
        : value;
      newParams.set(index, exportValue);
    } else newParams.delete(index);
    replace(`${path}?${newParams}`);
  };

  const { brand, price } = use(task);

  return (
    <>
      <BrandSelect
        params={params}
        values={brand}
        onSelectedUpdate={updateRoute}
      />
      <StockCheck params={params} onCheckedChange={updateRoute} />
      <PriceSlider
        params={params}
        values={price}
        onRangeUpdate={updateRoute}
      />
    </>
  );
}