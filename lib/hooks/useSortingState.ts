import {OnChangeFn, SortingState} from "@tanstack/react-table";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {getAsString} from "@/utils/utils";

export const useSortingState = (initialSorting: SortingState = []) => {
    const router = useRouter();

    const [sorting, setSorting] = useState<SortingState>(initialSorting)
    useEffect(() => {
        const sortList = getAsString(router.query?.sort_columns)?.split(',')?.map(value =>{
            const [key,dir] = value?.split(':')
            return {
                id: key,
                desc: dir != "asc"
            }
        }).filter(x => x.id  != '')
        if (sortList?.length > 0) {
            setSorting(sortList);
        }
    }, [router.query.sort_columns]);

    const onSortingChange: OnChangeFn<SortingState> = (updaterOrValue) => {
        const newSorting = typeof updaterOrValue === 'function' ? updaterOrValue(sorting) : updaterOrValue;
        setSorting(newSorting);

        if (newSorting.length > 0) {
            const x = newSorting[0];
            router.replace({
                pathname: router.pathname,
                query: {
                    ...router.query,
                    sort_columns: `${x.id}:${x.desc ? 'desc' : 'asc'}`
                }
            }, undefined, { shallow: true });
        } else {
            router.replace(
                {
                    pathname: router.pathname,
                    query: {
                        ...router.query,
                        sort_columns: undefined,
                    },
                },
                undefined,
                { shallow: true }
            );
        }
    };


    return { sorting, onSortingChange };
};