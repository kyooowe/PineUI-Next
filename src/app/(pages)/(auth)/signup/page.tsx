
//#region 
import type { Metadata } from "next";

import Link from "next/link";

import SignUpForm from "@/components/forms/auth/signup";
//#endregion

export const metadata: Metadata = {
   title: "Sign Up",
   description: "Create an Account"
}

const SignUpPage = async () => {
   return (
      <div className="container relative h-screen flex-col items-center justify-center min-[320px]:flex lg:max-w-none lg:px-0">
         <div className="lg:p-8">
            <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
               <div className="flex flex-col space-y-2 text-center">
                  <h1 className="text-2xl font-semibold tracking-tight">
                     Create an Account
                  </h1>
                  <p className="text-sm text-muted-foreground">
                     {`We're thrilled to have you here! Sign up to unlock amazing features. 🚀`}
                  </p>
               </div>
               <SignUpForm />
               <p className="px-8 text-center text-sm text-muted-foreground">
                  <Link
                     href="/login"
                     className="hover:text-brand underline underline-offset-4"
                  >
                     {`Already have an account? Log in here!`}
                  </Link>
               </p>
            </div>
         </div>
      </div>
   )
}

export default SignUpPage