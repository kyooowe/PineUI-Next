"use client"

import * as React from "react"
import {
   type ColumnFiltersState,
   type SortingState,
   type VisibilityState,
   flexRender,
   getCoreRowModel,
   getFacetedRowModel,
   getFacetedUniqueValues,
   getFilteredRowModel,
   getPaginationRowModel,
   getSortedRowModel,
   useReactTable,
} from "@tanstack/react-table"
import { ChartNoAxesGantt } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
   DropdownMenu,
   DropdownMenuCheckboxItem,
   DropdownMenuContent,
   DropdownMenuLabel,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from "@/components/ui/table"
import { crudColumns } from "./columns"
import type { iMockData } from "./page"
import { DataTablePagination } from "@/components/datatable/pagination"
import { DataTableToolbar } from "@/components/datatable/toolbar"

const mockData: iMockData[] = [
   {
      id: "1",
      name: "John Doe",
      email: "john.doe@example.com",
      status: "Regular",
      createdAt: new Date("2024-01-01T12:00:00Z")
   },
   {
      id: "2",
      name: "Jane Smith",
      email: "jane.smith@example.com",
      status: "Probationary",
      createdAt: new Date("2024-02-15T08:30:00Z")
   },
   {
      id: "3",
      name: "Alice Johnson",
      email: "alice.johnson@example.com",
      status: "Resigned",
      createdAt: new Date("2024-03-10T14:45:00Z")
   },
   {
      id: "4",
      name: "Bob Brown",
      email: "bob.brown@example.com",
      status: "Terminated",
      createdAt: new Date("2024-04-20T11:00:00Z")
   },
   {
      id: "5",
      name: "Charlie Davis",
      email: "charlie.davis@example.com",
      status: "Regular",
      createdAt: new Date("2024-05-30T09:15:00Z")
   }
];

export function CRUDTable() {
   const [rowSelection, setRowSelection] = React.useState({})
   const [columnVisibility, setColumnVisibility] =
      React.useState<VisibilityState>({})
   const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
      []
   )
   const [sorting, setSorting] = React.useState<SortingState>([])

   const table = useReactTable({
      data: mockData,
      columns: crudColumns,
      state: {
         sorting,
         columnVisibility,
         rowSelection,
         columnFilters,
      },
      enableRowSelection: true,
      onRowSelectionChange: setRowSelection,
      onSortingChange: setSorting,
      onColumnFiltersChange: setColumnFilters,
      onColumnVisibilityChange: setColumnVisibility,
      getCoreRowModel: getCoreRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      getSortedRowModel: getSortedRowModel(),
      getFacetedRowModel: getFacetedRowModel(),
      getFacetedUniqueValues: getFacetedUniqueValues(),
   })

   return (
      <>
         <div className="flex mt-3">
            <DataTableToolbar table={table} />
            <DropdownMenu>
               <DropdownMenuTrigger asChild>
                  <Button
                     variant="outline"
                     size="sm"
                     className="h-10 ml-auto flex lg:flex"
                  >
                     <ChartNoAxesGantt className="mr-2 h-4 w-4" />
                     View
                  </Button>
               </DropdownMenuTrigger>
               <DropdownMenuContent align="end" className="w-[150px]">
                  <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {table
                     .getAllColumns()
                     .filter((column) => column.getCanHide())
                     .map((column) => {
                        return (
                           <DropdownMenuCheckboxItem
                              key={column.id}
                              className="capitalize"
                              checked={column.getIsVisible()}
                              onCheckedChange={(value) =>
                                 column.toggleVisibility(!!value)
                              }
                           >
                              {column.id}
                           </DropdownMenuCheckboxItem>
                        )
                     })}
               </DropdownMenuContent>
            </DropdownMenu>
         </div>

         <div className="overflow-hidden border border-gray-300 rounded-lg mt-3">
            <Table>
               <TableHeader>
                  {
                     table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                           {headerGroup.headers.map((header) => {
                              return (
                                 <TableHead key={header.id}>
                                    {header.isPlaceholder
                                       ? null
                                       : flexRender(
                                          header.column.columnDef.header,
                                          header.getContext()
                                       )}
                                 </TableHead>
                              )
                           })}
                        </TableRow>
                     ))
                  }
               </TableHeader>
               <TableBody className="bg-white">
                  {
                     table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                           <TableRow
                              key={row.id}
                              data-state={row.getIsSelected() && "selected"}
                           >
                              {row.getVisibleCells().map((cell) => (
                                 <TableCell key={cell.id}>
                                    {flexRender(
                                       cell.column.columnDef.cell,
                                       cell.getContext()
                                    )}
                                 </TableCell>
                              ))}
                           </TableRow>
                        ))
                     ) : (
                        <TableRow>
                           <TableCell
                              colSpan={crudColumns.length}
                              className="h-24 text-center"
                           >
                              No results.
                           </TableCell>
                        </TableRow>
                     )
                  }
               </TableBody>
            </Table>
         </div>
         <DataTablePagination className="mt-2" table={table} />
      </>
   )
}