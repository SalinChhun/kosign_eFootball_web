import useFetchUser from "@/app/lib/hooks/useFetchUser";
import {getCoreRowModel, useReactTable, VisibilityState} from "@tanstack/react-table";
import {useSortingState} from "@/app/lib/hooks/useSortingState";
import React from "react";
import DataTable from "@/app/components/shared/DataTable";
import PaginationUI from "@/app/components/shared/Pagination";
import {Column} from "@/app/(root)/users/Column";
import UserPreviewAction from "@/app/(root)/users/UserPreviewAction";

const UserList = () => {

    const {sorting, onSortingChange} = useSortingState();
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
    const {user_list} = useFetchUser();
    console.log("user_list", user_list)

    const table = useReactTable({
        enableGlobalFilter: false,
        data: user_list || [],
        columns: Column,
        // state: {
        //     sorting,
        //     columnVisibility,
        // },
        onSortingChange: onSortingChange,
        getCoreRowModel: getCoreRowModel(),
        enableRowSelection: true,
        manualPagination: true,
        enableMultiSort: true,
        enableSortingRemoval: false,
        onColumnVisibilityChange: setColumnVisibility
    })

    return (
        <>
            <div id="ks_wt_app_main_content" className="ks_d_flex ks_flex_col ks_h100">
                <div className="ks_d_flex ks_flex_col ks_mt_auto ks_h100">
                    <div className="ks_table_wrapper ks_h100 ks_mt_12">
                        <DataTable
                            table={table}
                            // handleRowClick={(data) => {
                            //     setOpen(true);
                            //     setIsUpdate(true);
                            //     setUpdateData(data);
                            // }}
                            rowActions={(row) => {
                                const name = row.original.first_name + row.original.last_name;
                                return (
                                    <UserPreviewAction
                                        userName={name}
                                    />
                                );
                            }}
                            tableCustomClass="ks-table-no-border"
                        />
                    </div>
                    {/*<PaginationUI data={pagination!}/>*/}
                </div>
            </div>
        </>
    )

}

export default UserList;