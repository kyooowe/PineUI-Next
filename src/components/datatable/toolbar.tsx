import type { Table } from "@tanstack/react-table";
import { Input } from "../ui/input";
import { DataTableFacetedFilter } from "./faceted-filter";
import { crudStatus } from "@/constant/crud";

interface DataTableToolbarProps<TData> {
   table: Table<TData>
}

export function DataTableToolbar<TData>({
   table,
}: DataTableToolbarProps<TData>) {

   return (
      <>
         <Input
            placeholder="Filter names..."
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
               table.getColumn("name")?.setFilterValue(event.target.value)
            }
            className="w-[150px] lg:w-[250px]"
         />
         {table.getColumn("status") && (
            <DataTableFacetedFilter
               column={table.getColumn("status")}
               options={crudStatus}
               title="Status"
            />
         )}
      </>
   )
}