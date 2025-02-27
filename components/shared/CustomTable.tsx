import {ColumnDef, flexRender, getCoreRowModel, SortingState, useReactTable} from "@tanstack/react-table";
import cn from "clsx";
import React, {useEffect, useState} from "react";

import {v4 as uuidv4} from 'uuid';
import ArrowDown from "@/components/shared/icons/ArrowDown";
import ArrowUpSmall from "@/components/shared/icons/ArrowUpSmall";
import UnSortIcon from "@/components/shared/icons/UnSortIcon";
import {isEmpty} from "@/utils/utils";
import {useSortingState} from "@/lib/hooks/useSortingState";

type Props = {
    checkSelected?: (data: any) => void,
    data: any | undefined,
    defaultColumns: ColumnDef<any>[],
    total_page: number | undefined,
    handleRowClick?: (row: any) => void;
    editType?: string;
    resetSelectRow?: boolean,
    viewSetting?: ViewData[],
    storageKey?: string,
    excelDowloadFn?: Function,
    totalColumnId?: string,
    id?: string,
    defFromLocal?: number[],
    lists?: number[]
    defaultShowIndex?: number[]
    initialSorting?: SortingState
}

export interface ViewData {
    header: String,
    child: ViewChild[]
}

export interface ViewChild {
    title?: String, //id null get from column name
    index: number // start from 1
    isDefault?: boolean // set default check
}


const CustomTable: React.FC<Props>
    = ({
           checkSelected,
           data,
           defaultColumns,
           total_page,
           handleRowClick,
           editType,
           viewSetting,
           resetSelectRow = false,
           storageKey = "viewSetting",
           excelDowloadFn,
           totalColumnId,
           id,
           defFromLocal = [],
           lists = [],
           initialSorting = [],

       }) => {
    defaultColumns.length

    const [columns] = useState<typeof defaultColumns>([...defaultColumns])
    const {sorting, onSortingChange} = useSortingState(initialSorting);
    const [sorted, setSorted] = useState<string | null>(null);

    const table = useReactTable({
        data: data,
        columns,
        pageCount: total_page ?? -1,
        state: {
            // pagination,
            sorting,
            // columnVisibility,
            // columnOrder,
            // rowSelection
        },
        onSortingChange: (updaterOrValue) => {
            const newSorting = typeof updaterOrValue === 'function' ? updaterOrValue(sorting) : updaterOrValue;
            setSorted(newSorting.length > 0 ? newSorting[0].id : null);
            onSortingChange(updaterOrValue);
        },
        initialState: {
            sorting: initialSorting,
        },
        // onColumnOrderChange: setColumnOrder,
        // onColumnVisibilityChange: setColumnVisibility,
        getCoreRowModel: getCoreRowModel(),
        // onRowSelectionChange: setRowSelection,
        enableRowSelection: true,
        // enableSorting: true,
        manualPagination: true,
        enableMultiSort: true,
        enableSortingRemoval: true,
        // debugTable: true,
        // debugHeaders: true,
        // debugColumns: true,
        getRowId: row => uuidv4(),
    })

    useEffect(() => {
        if (resetSelectRow)
            table.resetRowSelection();
    }, [resetSelectRow, table])

    useEffect(() => {
        if (checkSelected)
            checkSelected(table.getSelectedRowModel().flatRows)
    }, [table.getSelectedRowModel().rows.length])

    const getEditType = (row: any) => {
        switch (editType) {
            // case "installment":
            //     return <InstallmentEditable row={row}/>
            // case "bill":
            //     return <BillEditable row={row}/>
            // case "customer":
            //     return <CustomerAction row={row}/>
            // case "item":
            //     return <EditItem row={row}/>
            //
            // default:
            //     break;
        }

    }

    return (
        <>

            <table id={id} className="w-full">
                <thead>
                {table.getHeaderGroups().map(headerGroup => (
                    <tr className="text-xs uppercase border-b border-gray-100" key={headerGroup.id}>
                        {headerGroup.headers.map((header, i) => (
                            <th
                                className={cn("ks_tbl_hd", (header.column.columnDef.meta as any)?.headerClass)}
                                key={header.id + i}
                                colSpan={header.colSpan}
                                style={{
                                    textAlign: (header.column.columnDef.meta as any)?.align,
                                    display: lists?.some(a => a == i + 1) ? defFromLocal.some(a => a == i + 1) ? 'table-cell' : 'none' : 'table-cell'
                                }}
                            >
                                {
                                    header.isPlaceholder
                                        ? null
                                        : <div {...{

                                            className: cn('', {
                                                'cursor-pointer select-none': header.column.getCanSort(),
                                            }),
                                            onClick: (e) => {
                                                if (header.column.getCanSort()) {
                                                    const currentSortDirection = header.column.getIsSorted();
                                                    if (currentSortDirection === false) {
                                                        header.column.toggleSorting(false);
                                                    } else if (currentSortDirection === "asc") {
                                                        header.column.toggleSorting(true);
                                                    } else if (currentSortDirection === "desc") {
                                                        header.column.toggleSorting(false);
                                                    } else {
                                                        header.column.clearSorting();
                                                    }
                                                }
                                            }
                                        }}>
                                            {
                                                header.id !== 'checkbox' ?
                                                    (flexRender(
                                                        header.column.columnDef.header,
                                                        header.getContext()
                                                    ) as any) : flexRender(
                                                        header.column.columnDef.header,
                                                        header.getContext()
                                                    )
                                            }
                                            {header.column.getIsSorted() === "asc" && <ArrowUpSmall/>}
                                            {header.column.getIsSorted() === "desc" && <ArrowDown/>}
                                            {header.column.getCanSort() &&
                                                ((!header.column.getIsSorted() &&
                                                        !initialSorting.some(sort => sort.id === header.column.id) &&
                                                        sorted !== header.column.id) ||
                                                    (initialSorting.some(sort => sort.id === header.column.id) &&
                                                        !header.column.getIsSorted())) &&
                                                <UnSortIcon/>}
                                        </div>
                                }

                            </th>
                        ))}
                        {editType ? <th className="ks_tbl_hd ks_wth1"></th> : <></>}
                        {excelDowloadFn != undefined ? <th className="ks_tbl_hd ks_wth1" key='dow-excel'></th> : <></>}

                    </tr>
                ))}
                </thead>
                <tbody className="divide-y divide-gray-100">
                {
                    table.getRowModel().rows.length == 0
                        ?
                        <tr className="ks_brd_top ks_tbl_data_row" style={{textAlign: "center"}}>
                            {editType ?
                                <td className="ks_tbl_data" colSpan={table.getVisibleFlatColumns().length + 1}>Empty
                                    List</td>
                                : <td className="ks_tbl_data" colSpan={table.getVisibleFlatColumns().length}>Empty
                                    List</td>
                            }
                        </tr>
                        :
                        table.getRowModel().rows.map((row, j) => {
                            if (!isEmpty(totalColumnId) && j == table.getRowModel().rows.length - 1) {
                                return (<React.Fragment key={row.id + j + 'r'}>
                                        <tr className={"cursor-pointer hover:bg-gray-50 transition-colors"}
                                            key={row.id + j + 'j'} onClick={() => {
                                            if (handleRowClick) {
                                                handleRowClick(row.original)
                                            }
                                        }}>
                                            {row.getVisibleCells().map((cell, i) => (
                                                <React.Fragment key={i + 1 + j + 'r'}>
                                                    <td className={"ks_tbl_data"}
                                                        key={i}
                                                        align={(cell.column.columnDef.meta as any)?.align}
                                                        style={{display: lists?.some(a => a == i + 1) ? defFromLocal.some(a => a == i + 1) ? 'table-cell' : 'none' : 'table-cell'}}
                                                    >
                                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                    </td>
                                                    {excelDowloadFn != undefined && i == row.getVisibleCells().length - 1 ?
                                                        <td onClick={() => {
                                                            excelDowloadFn!(data[j])
                                                        }} key={i + 1 + 'excel'}
                                                            className="ks_tbl_data text_align_right">
                                                            <svg width="17" height="18" className="ks_mr5"
                                                                 viewBox="0 0 17 18" fill="none"
                                                                 xmlns="http://www.w3.org/2000/svg">
                                                                <path
                                                                    d="M8.50001 15.7974C9.43154 15.7974 10.3054 15.6198 11.1217 15.2647C11.9425 14.9096 12.6665 14.4185 13.2937 13.7913C13.9209 13.1688 14.412 12.4471 14.7671 11.6262C15.1222 10.8054 15.2997 9.92917 15.2997 8.99764C15.2997 8.06611 15.1199 7.19222 14.7602 6.37598C14.4051 5.55512 13.914 4.83111 13.2868 4.20394C12.6642 3.57677 11.9425 3.08794 11.1217 2.73747C10.3008 2.38238 9.42463 2.20483 8.49309 2.20483C7.56617 2.20483 6.69228 2.38238 5.87143 2.73747C5.05057 3.08794 4.32656 3.57677 3.69939 4.20394C3.07683 4.83111 2.58801 5.55512 2.23292 6.37598C1.87783 7.19222 1.70029 8.06611 1.70029 8.99764C1.70029 9.92917 1.87783 10.8054 2.23292 11.6262C2.58801 12.4471 3.07683 13.1688 3.69939 13.7913C4.32656 14.4185 5.05057 14.9096 5.87143 15.2647C6.69228 15.6198 7.56848 15.7974 8.50001 15.7974ZM8.51384 5.48364C8.69831 5.48364 8.85049 5.54359 8.97039 5.66349C9.0949 5.77878 9.15716 5.92866 9.15716 6.11312V9.23283L9.0949 10.6301L9.68979 9.87614L10.423 9.1014C10.5337 8.97689 10.6767 8.91463 10.8519 8.91463C11.0271 8.91463 11.1701 8.96997 11.2808 9.08065C11.3961 9.18671 11.4537 9.32275 11.4537 9.48877C11.4537 9.65479 11.3938 9.80235 11.2739 9.93148L9.03264 12.2073C8.87585 12.3733 8.70292 12.4563 8.51384 12.4563C8.32016 12.4563 8.14492 12.3733 7.98813 12.2073L5.74692 9.93148C5.63163 9.80697 5.57398 9.6594 5.57398 9.48877C5.57398 9.32275 5.62932 9.18671 5.74 9.08065C5.85068 8.96997 5.99133 8.91463 6.16196 8.91463C6.34181 8.91463 6.48707 8.97689 6.59775 9.1014L7.34482 9.88997L7.92587 10.6301L7.8567 9.23283V6.11312C7.8567 5.92866 7.91896 5.77878 8.04347 5.66349C8.16798 5.54359 8.32477 5.48364 8.51384 5.48364Z"
                                                                    fill="#0F1FEA"/>
                                                            </svg>
                                                            Download
                                                        </td> : <></>}
                                                </React.Fragment>
                                            ))}
                                        </tr>
                                    </React.Fragment>

                                )
                            } else {
                                return (
                                    <tr className={"cursor-pointer hover:bg-gray-50 transition-colors"} key={row.id}
                                        onClick={() => {
                                            if (handleRowClick) {
                                                handleRowClick(row.original)
                                            }
                                        }}>
                                        {row.getVisibleCells().map((cell, i) => (
                                            <React.Fragment key={cell.id + i + 'k'}>
                                                <td className={`${cell.column.id == 'address' && 'ks_ellipsis ks-wb-max-width-280'}
                                                ${cell.column.id == 'remark' && 'ks_ellipsis ks-wb-max-width-280'}
                                                ${cell.column.columnDef.id === 'descriptions' ? row?.original?.status_code == 3 ? 'ks-wb-column-highlight  ks_brd_left ' : 'ks-wb-column-no-highlight  ks_brd_left' : ''} 
                                                ${cell.column.columnDef.id === 'billNo' ? row?.original?.status_code == 3 ? 'ks-wb-column-highlight ' : 'ks-wb-column-no-highlight' : ''}
                                                ${cell.column.columnDef.id === 'status_code' ? row?.original?.status_code == 3 ? 'ks-wb-column-highlight  ' : 'ks-wb-column-no-highlight  ' : ''}
                                                ks_tbl_data position-relative`}
                                                    key={i}
                                                    align={(cell.column.columnDef.meta as any)?.align}
                                                    style={{
                                                        display: lists?.some(a => a == i + 1) ? defFromLocal.some(a => a == i + 1) ? 'table-cell' : 'none' : 'table-cell',
                                                    }}
                                                >
                                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                </td>

                                                {excelDowloadFn != undefined && i == row.getVisibleCells().length - 1 ?
                                                    <td onClick={() => {
                                                        excelDowloadFn!(data[j])
                                                    }} key={i + 1 + 'excel'} className="ks_tbl_data text_align_right">
                                                        <svg width="17" height="18" className="ks_mb-5 ks_mr5"
                                                             viewBox="0 0 17 18" fill="none"
                                                             xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                                d="M8.50001 15.7974C9.43154 15.7974 10.3054 15.6198 11.1217 15.2647C11.9425 14.9096 12.6665 14.4185 13.2937 13.7913C13.9209 13.1688 14.412 12.4471 14.7671 11.6262C15.1222 10.8054 15.2997 9.92917 15.2997 8.99764C15.2997 8.06611 15.1199 7.19222 14.7602 6.37598C14.4051 5.55512 13.914 4.83111 13.2868 4.20394C12.6642 3.57677 11.9425 3.08794 11.1217 2.73747C10.3008 2.38238 9.42463 2.20483 8.49309 2.20483C7.56617 2.20483 6.69228 2.38238 5.87143 2.73747C5.05057 3.08794 4.32656 3.57677 3.69939 4.20394C3.07683 4.83111 2.58801 5.55512 2.23292 6.37598C1.87783 7.19222 1.70029 8.06611 1.70029 8.99764C1.70029 9.92917 1.87783 10.8054 2.23292 11.6262C2.58801 12.4471 3.07683 13.1688 3.69939 13.7913C4.32656 14.4185 5.05057 14.9096 5.87143 15.2647C6.69228 15.6198 7.56848 15.7974 8.50001 15.7974ZM8.51384 5.48364C8.69831 5.48364 8.85049 5.54359 8.97039 5.66349C9.0949 5.77878 9.15716 5.92866 9.15716 6.11312V9.23283L9.0949 10.6301L9.68979 9.87614L10.423 9.1014C10.5337 8.97689 10.6767 8.91463 10.8519 8.91463C11.0271 8.91463 11.1701 8.96997 11.2808 9.08065C11.3961 9.18671 11.4537 9.32275 11.4537 9.48877C11.4537 9.65479 11.3938 9.80235 11.2739 9.93148L9.03264 12.2073C8.87585 12.3733 8.70292 12.4563 8.51384 12.4563C8.32016 12.4563 8.14492 12.3733 7.98813 12.2073L5.74692 9.93148C5.63163 9.80697 5.57398 9.6594 5.57398 9.48877C5.57398 9.32275 5.62932 9.18671 5.74 9.08065C5.85068 8.96997 5.99133 8.91463 6.16196 8.91463C6.34181 8.91463 6.48707 8.97689 6.59775 9.1014L7.34482 9.88997L7.92587 10.6301L7.8567 9.23283V6.11312C7.8567 5.92866 7.91896 5.77878 8.04347 5.66349C8.16798 5.54359 8.32477 5.48364 8.51384 5.48364Z"
                                                                fill="#0F1FEA"/>
                                                        </svg>
                                                        Download
                                                    </td> : <></>}
                                            </React.Fragment>
                                        ))}
                                    </tr>
                                )
                            }
                        })
                }
                </tbody>

            </table>
        </>
    );
}


export default CustomTable;
