import {ColumnDef} from "@tanstack/react-table";
import {Product, ProductResponse} from "@/app/lib/types/common";
import IndeterminateCheckbox from "@/app/components/shared/IndeterminateCheckbox";

export const DefaultColumns: ColumnDef<Product>[] = [
    {
        // meta: {headerClass: "ks_table_no_padding ks_wth_1 "},
        accessorKey: "checkbox",
        id: "checkbox",
        enableSorting: false,
        header: ({table}) => (
            <IndeterminateCheckbox
                {...{
                    checked: table.getIsAllRowsSelected(),
                    indeterminate: table.getIsSomeRowsSelected(),
                    onChange: table.getToggleAllRowsSelectedHandler(),
                }}
            />
        ),
        cell: ({row}) => {
            return (
                <IndeterminateCheckbox
                    {...{
                        checked: row.getIsSelected(),
                        disabled: !row.getCanSelect(),
                        indeterminate: row.getIsSomeSelected(),
                        onChange: row.getToggleSelectedHandler(),
                    }}
                />
            )
        }
    },
    {
        meta: {headerClass: "ks_table_header_custom"},
        accessorKey: "product_name",
        id: "productName",
        header: "Product Name",
        cell: ({row}) =>
            <div className="ks_d_inl_flex ks_flex_col ks_pl_0">
                <label className="ks-wt-ellipsis">{row?.original?.product_name}</label>
            </div>
    },
    {
        meta: {headerClass: "ks_table_header_custom"},
        accessorKey: "sale_price",
        id: "salePrice",
        header: "Sale Price",
        cell: ({row}) =>
            <div className="ks_d_inl_flex ks_flex_col ks_pl_0">
                <label className="ks-wt-ellipsis">{row?.original?.sale_price}</label>
            </div>
    },
]