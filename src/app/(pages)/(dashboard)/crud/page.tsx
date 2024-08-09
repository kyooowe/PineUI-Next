//#region Import
import { redirect } from "next/navigation"
import type { Metadata } from "next"

import { validateRequest } from "@/lib/auth"

import { CRUDTable } from "./table"
//#endregion

export const metadata: Metadata = {
   title: "CRUD",
   description: "Main page"
}

export interface iMockData {
   id: string
   name: string
   email: string
   status: "Regular" | "Probationary" | "Resigned" | "Terminated"
   createdAt: Date
}

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

const CRUD = async () => {

   const user = await validateRequest()
   if (!user) redirect("/signin")

   return (
      <div className="mt-2">
         <span className='bg-gradient-to-r text-transparent bg-clip-text from-blue-500 to-violet-600 text-4xl font-bold'>CRUD Page</span>
         <div className='sm:flex sm:items-center sm:justify-between mt-5'>
            <div>
               <div className='flex items-center gap-x-3'>
                  <h2 className='text-lg font-medium text-gray-800 dark:text-white'>
                     Employees
                  </h2>

                  <span className='px-3 py-1 text-xs text-blue-600 bg-blue-200 rounded-full dark:bg-gray-800'>
                     {mockData.length}
                  </span>
               </div>

               <p className='mt-1 text-sm text-gray-500 dark:text-gray-300'>
                  To guarantee precision, we have compiled a comprehensive list of regular, probationary, resigned, and terminated employees.
               </p>
            </div>
         </div>

         <CRUDTable />
      </div>
   )
}

export default CRUD