"use client";

import { SidebarFilterValues } from "@/lib/types";
import { use } from "react";
import { MultiSelectList } from "../multi-select-list";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function FilterArea({
  task,
}: {
  task: Promise<SidebarFilterValues>;
}) {
  const { replace } = useRouter();
  const path = usePathname();
  const params = useSearchParams();
  const { brand } = use(task);

  const paramsBrand = params.has("brand")
    ? params.get("brand")!.split(",")
    : [];

  const updateRoute = ({
    index,
    value,
  }: {
    index: string;
    value: string | string[];
  }) => {
    const newParams = new URLSearchParams(params);
    if (value.length)
      newParams.set(
        index,
        Array.isArray(value) ? value.join(",").toLowerCase() : value
      );
    else newParams.delete("brand");
    replace(decodeURIComponent(`${path}?${newParams}`));
  };

  const brandOptions = brand?.map((b) => ({
    id: b.toLowerCase(),
    label: b,
  }));

  return (
    <>
      {brandOptions && (
        <MultiSelectList
          title="Filter by brand"
          selected={paramsBrand}
          items={brandOptions}
          onSelectionChange={(value) => updateRoute({ index: "brand", value })}
        />
      )}
    </>
  );
}
