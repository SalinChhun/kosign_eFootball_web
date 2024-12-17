'use client'
import {OnChangeFn, SortingState} from "@tanstack/react-table";
import {useEffect, useState} from "react";
import {getAsString} from "@/utils/utils";
import {usePathname, useRouter, useSearchParams} from "next/navigation";

export const useSortingState = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathName = usePathname();
    const [sorting, setSorting] = useState<SortingState>([])

    useEffect(() => {
        const sortList = getAsString(searchParams.get('sort_columns'))?.split(',')?.map(value =>{
            const [key,dir] = value?.split(':')
            return {
                id: key,
                desc: dir != "asc"
            }
        }).filter(x => x.id  != '')

        setSorting(sortList)

    }, [searchParams]);

    const onSortingChange: OnChangeFn<SortingState> = (updaterOrValue) => {
        setSorting(updaterOrValue)
        // @ts-ignore
        const x = updaterOrValue()[0]
        const params = new URLSearchParams(searchParams);
        params.set('sort_columns', `${x.id}:${x.desc?'desc':'asc'}`);
        router.push(`${pathName}?${params.toString()}`);
    };

    return { sorting, onSortingChange };
};