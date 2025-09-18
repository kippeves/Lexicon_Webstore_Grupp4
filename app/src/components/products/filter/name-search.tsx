import { Input } from "@/components/ui/input";
import { ReadonlyURLSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import FilterCard from "./filter-card";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export default function NameSearch({
  params,
  onValueChange,
}: {
  params: ReadonlyURLSearchParams;
  onValueChange: (index: string, checked: string | undefined) => void;
}) {
  const previousValue = params?.get("search") ?? "";
  const [search, setSearch] = useState<string | undefined>(previousValue);

  // Debounce callback
  const debounced = useDebouncedCallback(
    // function
    () => {
      getSearchValue();
    },
    // delay in ms
    300
  );

  function getSearchValue() {
    setSearch(ref.current?.value);
  }

  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (previousValue !== search) {
      onValueChange("search", search);
    }
  }, [onValueChange, previousValue, search]);

  return (
    <FilterCard title="Search">
      <div className="flex focus-within:outline-3 rounded-md">
        <Input
          defaultValue={search}
          ref={ref}
          type="search"
          onChange={() => debounced()}
          className="rounded-s-md rounded-e-none focus-visible:ring-0"
        />
        <Button
          onClick={() => getSearchValue()}
          type="button"
          className="rounded-s-none rounded-e-md bg-gray-400"
        >
          <Search />
        </Button>
      </div>
    </FilterCard>
  );
}
