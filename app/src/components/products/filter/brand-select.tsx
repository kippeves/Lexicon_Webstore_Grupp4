import { MultiSelectList } from "@/components/multi-select-list";
import { ReadonlyURLSearchParams } from "next/navigation";
import React from "react";

export default function BrandSelect({
  onSelectedUpdate,
  params,
  options,
}: {
  onSelectedUpdate: (index: string, value: string[]) => void;
  params: ReadonlyURLSearchParams;
  options: string[];
}) {
  const paramsBrand = params.has("brand")
    ? params.get("brand")!.split(",")
    : [];

  const brandOptions = options.map((b) => ({
    id: b.toLowerCase(),
    label: b,
  }));

  return (
    <MultiSelectList
      title="Brand"
      selected={paramsBrand}
      items={brandOptions}
      onSelectionChange={(value) => onSelectedUpdate("brand", value)}
    />
  );
}
