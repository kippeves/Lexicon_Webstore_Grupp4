import { MultiSelectList } from "@/components/multi-select-list";
import { ReadonlyURLSearchParams } from "next/navigation";
import React from "react";

export default function BrandSelect({
  onSelectedUpdate,
  params,
  values,
}: {
  onSelectedUpdate: (index: string, value: string[]) => void;
  params: ReadonlyURLSearchParams;
  values: string[];
}) {
  
  const paramsBrand = params.get("brand")?.split(",") ?? [];

  const options = values?.map((item) => ({
    id: item.toLowerCase(),
    label: item,
  }));

  return (
    options && (
      <MultiSelectList
        title="Brand"
        selected={paramsBrand}
        items={options}
        onSelectionChange={(value) => onSelectedUpdate("brand", value)}
      />
    )
  );
}
