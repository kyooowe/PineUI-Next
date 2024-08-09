"use client"

//#region Import
import type { Row } from "@tanstack/react-table"

import { Ellipsis } from "lucide-react"

import { Button } from "../ui/button"
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuShortcut,
   DropdownMenuTrigger,
} from "../ui/dropdown-menu"
//#endregion

interface DataTableRowActionsProps<TData> {
   row: Row<TData>
}

export function DataTableRowActions<TData>({
   row,
}: DataTableRowActionsProps<TData>) {

   return (
      <DropdownMenu>
         <DropdownMenuTrigger asChild>
            <Button
               variant="ghost"
               className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
            >
               <Ellipsis className="h-4 w-4" />
               <span className="sr-only">Open menu</span>
            </Button>
         </DropdownMenuTrigger>
         <DropdownMenuContent align="end" className="w-[160px]">
            <DropdownMenuItem onClick={() => console.log(row)}>
               Edit
               <DropdownMenuShortcut>⌘E</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => console.log(row)}>
               Delete
               <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
            </DropdownMenuItem>
         </DropdownMenuContent>
      </DropdownMenu>
   )
}