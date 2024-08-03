import { validateRequest } from "@/lib/auth";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
   title: "Dashboard",
   description: "Main page"
}

const Dashboard = async () => {
   const user = await validateRequest()

   if(!user) redirect("/signin")

   return (
      <h1>Test</h1>
   )
}

export default Dashboard;