"use client"

//#region Import
import { redirect } from "next/navigation"

import { useState, useTransition } from "react"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { cn } from "@/lib/utils"

import { AlertCircle } from "lucide-react"

import { Input } from "@/components/ui/input"
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "@/components/ui/form"
import {
   SoftAlert,
   SoftAlertDescription,
   SoftAlertTitle
} from "@/components/ui/soft-alert"
import LoadingButton from "@/components/ui/loading-button"

import { signUpAction } from "@/app/(pages)/(auth)/action"
//#endregion

const signUpSchema = z.object({
   fullName: z.string().min(5, {
      message: "Full name must be at least 4 characters."
   }), 
   email: z.string().email({
      message: "Invalid email address."
   }),
   password: z.string().min(4, {
      message: "Password must be at least 4 characters."
   }),
   confirmPassword: z.string().min(4, {
      message: "Password must be at least 4 characters."
   })
})

const SignUpForm = () => {

   //#region State
   const [isPending, startTranstion] = useTransition()

   const [hasError, setHasError] = useState<boolean>(false)
   const [errorMessage, setErrorMessage] = useState<string>("")

   const form = useForm<z.infer<typeof signUpSchema>>({
      resolver: zodResolver(signUpSchema),
      defaultValues: {
         fullName: "",
         email: "",
         password: "",
         confirmPassword: ""
      }
   })
   //#endregion

   //#region Handler
   const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
      if (data.password !== data.confirmPassword) {
         setHasError(true)
         setErrorMessage("Password do not match.")

         form.resetField("password")
         form.resetField("confirmPassword")
         form.setFocus("password")

         return
      }

      // Action Here
      startTranstion(async () => {
         const { error } = await signUpAction(data)

         console.log(error)

         if (error === "")
            redirect("/")
         else {
            setHasError(true)
            setErrorMessage(error)
         }
      })
   }
   //#endregion

   return (
      <div className={cn("grid gap-1")}>
         {hasError && (
            <SoftAlert variant="destructive">
               <AlertCircle />
               <SoftAlertTitle>Ooops!</SoftAlertTitle>
               <SoftAlertDescription>{errorMessage}</SoftAlertDescription>
            </SoftAlert>
         )}
         <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
               <div className="grid gap-4">
                  <div className="grid gap-3">
                     <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel className="text-muted-foreground">Full Name</FormLabel>
                              <FormControl>
                                 <Input type="text" placeholder="John Doe" {...field} />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />
                     <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel className="text-muted-foreground">Email Address</FormLabel>
                              <FormControl>
                                 <Input type="email" placeholder="john@email.com" {...field} />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />
                     <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel className="text-muted-foreground">Password</FormLabel>
                              <FormControl>
                                 <Input type="password" placeholder="****" {...field} />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />
                     <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel className="text-muted-foreground">Confirm Password</FormLabel>
                              <FormControl>
                                 <Input type="password" placeholder="****" {...field} />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />
                  </div>
                  <LoadingButton loading={isPending} className="mt-2" type="submit">
                     Sign Up
                  </LoadingButton>
               </div>
            </form>
         </Form>
      </div>
   )
}

export type signUpFormProps = z.infer<typeof signUpSchema>
export default SignUpForm