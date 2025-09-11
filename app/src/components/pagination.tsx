"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";

type Props = { offset: number; limit: number; total: number };

export function PaginationFilter({ offset = 0, limit = 12, total = 0 }: Props) {

    const pathname = usePathname();
    const { replace } = useRouter();
    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams);
    const limitOptions = [12, 24, 48];

    const limitVal = searchParams.get("limit") || limitOptions[0].toString();

    const setLimit = (value: string) => {
        const num = Number.parseInt(value);
        if (isNaN(num)) {
            return;
        }
        if (limitOptions.includes(num)) {
            params.set("limit", value);
        } else if (params.has("limit")) {
            // Use default
            params.delete("limit");
        }
        replace(`${pathname}?${params.toString()}`);
    }

    return (
        <div className="flex flex-row items-center w-full p-4 border border-gray mb-4 rounded-xs shadow">
            <p><strong>{`${offset} - ${(offset + Math.min(total - offset, total))}`}</strong><span>{` of ${total} results`}</span></p>
            <label htmlFor="pagination-limit" className="ml-5">Show items&nbsp;</label>
            <ToggleGroup id="pagination-limit" type="single" className="bg-gray-100 text-gray-500" onValueChange={(value) => setLimit(value)} defaultValue={limitVal}>
                <ToggleGroupItem value="12" className="px-3 hover:bg-gray-300">12</ToggleGroupItem>
                <ToggleGroupItem value="24" className="px-2 hover:bg-gray-300">24</ToggleGroupItem>
                <ToggleGroupItem value="48" className="px-3 hover:bg-gray-300">48</ToggleGroupItem>
            </ToggleGroup>
        </div>
    );
}