"use client";

import { useState } from "react";
import { Combobox, ComboboxOption } from "../combobox";

export default function BrandSelect({
  brands,
  initialValue,
  className,
  onChange
}: {
  brands: string[];
  initialValue?: string;
  className?: string;
  onChange?: (newValue: string) => void;
}) {

  const [value, setValue] = useState("");

  function changeBrand(option: ComboboxOption) {
    setValue(option.label);
    if (onChange) {
      onChange(option.label);
    }
  }

  function addBrand(label: ComboboxOption["label"]) {
    setValue(label);
    if (onChange) {
      onChange(label);
    }
  }

  return (
    <>
      <input type="hidden" id="brand" name="brand" value={value} />
      <Combobox
        options={brands.map(brand => {
          return { value: brand, label: brand };
        })}
        selected={initialValue ?? ""}
        onChange={changeBrand}
        onCreate={addBrand}
        className={className}
      />
    </>
  );
}
