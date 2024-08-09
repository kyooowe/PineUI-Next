"use client"

import type { ColumnDef } from "@tanstack/react-table"
import type { iMockData } from "./page"
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/datatable/column-header";
import { BadgeCheck, BadgeHelp, BadgeMinus, BadgeX } from "lucide-react";
import { DataTableRowActions } from "@/components/datatable/row-actions";
import { crudStatus } from "@/constant/crud";

const getIcon = (status: string) => {
   if (status === 'Regular')
      return <BadgeCheck className="w-4 h-4 gap-2 text-muted-foreground" />

   if (status === 'Probationary')
      return <BadgeHelp className="w-4 h-4 gap-2 text-muted-foreground" />

   if (status === 'Resigned')
      return <BadgeMinus className="w-4 h-4 gap-2 text-muted-foreground" />

   if (status === 'Terminated')
      return <BadgeX className="w-4 h-4 gap-2 text-muted-foreground" />
}

export const crudColumns: ColumnDef<iMockData>[] = [
   {
      id: "select",
      header: ({ table }) => (
         <Checkbox
            checked={
               table.getIsAllPageRowsSelected() ||
               (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Select all"
            className="translate-y-[-4px]"
         />
      ),
      cell: ({ row }) => (
         <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
            className="translate-y-[-3px]"
         />
      ),
      enableSorting: false,
      enableHiding: false,
   },
   {
      accessorKey: "name",
      header: ({ column }) => (
         <DataTableColumnHeader column={column} title="Full Name" />
      ),
      cell: ({ row }) => <div>{row.getValue("name")}</div>,
      enableSorting: true,
      enableHiding: false,
   },
   {
      accessorKey: "email",
      header: ({ column }) => (
         <DataTableColumnHeader column={column} title="Email Address" />
      ),
      cell: ({ row }) => <div className="w-1">{row.getValue("email")}</div>,
      enableSorting: true,
      enableHiding: true,
   },
   {
      accessorKey: "status",
      header: ({ column }) => (
         <DataTableColumnHeader column={column} title="Status" />
      ),
      cell: ({ row }) => {

         const status = crudStatus.find(
            (status) => status.value === row.getValue('status')
         )

         if (!status)
            return null

         return (
            <div className="flex items-center space-x-2">
               {status.icon}
               <span className="capitalize">{status.label}</span>
            </div>
         )
      },
      filterFn: (row, id, value) => {
         // eslint-disable-next-line @typescript-eslint/no-unsafe-return
         return value.includes(row.getValue(id))
      },
   },
   {
      accessorKey: "createdAt",
      header: ({ column }) => (
         <DataTableColumnHeader column={column} title="Created At" />
      ),
      cell: ({ row }) => {

         const createdAt = new Date(row.getValue("createdAt"))

         const properDate = createdAt.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
         });

         return (
            <span>{properDate}</span>
         )
      },
   },
   {
      id: "actions",
      cell: ({ row }) => <DataTableRowActions row={row} />,
      size: 1
   }
]