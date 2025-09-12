"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "./ui/pagination";

type Props = { page: number; limit: number; total: number };
const limitList = [12, 24, 48];

export function PaginationFilter({ page = 1, limit = limitList[0], total = 0 }: Props) {

    const pathname = usePathname();
    const { replace } = useRouter();
    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams);

    limit = (limitList.includes(limit)) ? limit : limitList[0];
    const offset = Math.round((page - 1) * limit);
    const start = (total > 0) ? offset + 1 : 0;

    const setLimit = (value: string) => {
        const num = Number.parseInt(value);
        if (isNaN(num)) {
            return;
        }
        if (limitList.includes(num)) {
            params.set("limit", value);
        } else if (params.has("limit")) {
            // Use default
            params.delete("limit");
        }
        replace(`${pathname}?${params.toString()}`);
    }

    return (
        <div className="flex flex-row justify-start items-center gap-8 w-full p-4 border border-gray mb-4 rounded-xs shadow">
            <p><strong>{`${Math.min(start, total)} - ${Math.min(page * limit, total)}`}</strong><span>{` of ${total} results`}</span></p>
            <div className="flex flex-row items-center">
                <label htmlFor="pagination-limit">Show items&nbsp;</label>
                <ToggleGroup id="pagination-limit" type="single" className="bg-gray-100 text-gray-500" onValueChange={(value) => setLimit(value)} defaultValue={limit.toString()}>
                    {limitList.map((val) => (
                        <ToggleGroupItem key={val} value={val.toString()} className="px-2 cursor-pointer hover:bg-gray-300">{val}</ToggleGroupItem>
                    ))}
                </ToggleGroup>
            </div>
        </div>
    );
}

export function PaginationPaging({ page = 1, limit = limitList[0], total = 0 }: Props) {

    const pathname = usePathname();
    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams);

    limit = (limitList.includes(limit)) ? limit : limitList[0];
    const pageEnd = Math.ceil(total / limit);

    const range = (lo: number, hi: number) => Array.from({ length: hi - lo }, (_, i) => i + lo);

    const pagination = (count: number) => (page: number, total: number) => {
        const { max, min, floor } = Math;
        const start = max(1, min(page - floor((count - 3) / 2), total - count + 2))
        const end = min(total, max(page + floor((count - 2) / 2), count - 1))
        return [
            ... (start > 2 ? [1, "..."] : start > 1 ? [1] : []),
            ...range(start, end + 1),
            ... (end < total - 1 ? ["...", total] : end < total ? [total] : [])
        ]
    }
    const buttonMax = 5;
    const pages = pagination(buttonMax)(page, Math.ceil(total / limit));

    const pageParams = (params: URLSearchParams, page: number): string => {
        params.set("page", page.toString());
        return `${pathname}?${params.toString()}`;
    }

    const pagingElement = (val: string | number) => {
        if (Number.isInteger(val)) {
            return (
                <PaginationItem key={val}>
                    <PaginationLink href={pageParams(params, parseInt(val.toString()))} className={(page == val) ? "bg-gray-300" : ""}>{val}</PaginationLink>
                </PaginationItem>
            );
        } else {
            return (
                <PaginationItem key={val}>
                    <PaginationEllipsis />
                </PaginationItem>
            );
        }
    }

    return (
        <div className="flex flex-row justify-center items-center w-full p-4 border border-gray mt-4 rounded-xs shadow gap-2">
            <Pagination>
                <PaginationContent>
                    {(total > 0 && page > 1) ?
                        <PaginationItem>
                            <PaginationPrevious href={pageParams(params, page - 1)} />
                        </PaginationItem>
                        : ''}
                    {pages.map((item) => pagingElement(item))}
                    {(total > 0 && page < pageEnd) ?
                        <PaginationItem>
                            <PaginationNext href={pageParams(params, page + 1)} />
                        </PaginationItem>
                        : ''}
                </PaginationContent>
            </Pagination>
        </div>
    );
}