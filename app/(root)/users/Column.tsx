import {ColumnDef} from "@tanstack/react-table";
import {User} from "@/app/lib/types/common";
import IndeterminateCheckbox from "@/app/components/shared/IndeterminateCheckbox";

export const Column: ColumnDef<User>[] = [
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
        accessorKey: "first_name",
        id: "firstname",
        header: "First Name",
        cell: ({row}) =>
            <div className="ks_d_inl_flex ks_flex_col ks_pl_0">
                <label className="ks-wt-ellipsis">{row?.original?.first_name == null ? "Null" : row?.original?.first_name}</label>
            </div>
    },
    {
        meta: {headerClass: "ks_table_header_custom"},
        accessorKey: "last_name",
        id: "lastname",
        header: "Last Name",
        cell: ({row}) =>
            <div className="ks_d_inl_flex ks_flex_col ks_pl_0">
                <label className="ks-wt-ellipsis">{row?.original?.last_name == null ? "Null" : row?.original?.last_name}</label>
            </div>
    },
    {
        meta: {headerClass: "ks_table_header_custom"},
        accessorKey: "email",
        id: "email",
        header: "Email",
        cell: ({row}) =>
            <div className="ks_d_inl_flex ks_flex_col ks_pl_0">
                <label className="ks-wt-ellipsis">{row?.original?.email}</label>
            </div>
    },
]