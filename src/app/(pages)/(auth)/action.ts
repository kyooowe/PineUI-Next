"use server"

//#region Import
import { lucia } from "@/lib/auth";

import { db } from "@/server/db";

import { cookies } from "next/headers"

import { redirect } from "next/navigation"

import { hash, verify } from "@node-rs/argon2";

import type { signInFormProps } from "@/components/forms/auth/signin";
import type { signUpFormProps } from "@/components/forms/auth/signup";
//#endregion

export const signInAction = async (data: signInFormProps): Promise<{ error: string }> => {
   try {

      // Check if the account exist in db
      const user = await db.user.findFirst({
         where: {
            email: {
               equals: data.email,
               mode: "insensitive"
            }
         }
      })

      if (!user) {
         return {
            error: "Incorrect username or password."
         }
      }

      // Verify if inputted password is match in db password
      const isPasswordValid = await verify(user.password, data.password, {
         memoryCost: 19456,
         timeCost: 2,
         outputLen: 32,
         parallelism: 1,
      })

      if (!isPasswordValid)
         return { error: "Incorrect username or password." }

      // Create user session using Lucia
      const session = await lucia.createSession(user.id.toString(), {})
      const sessionCookie = await lucia.createSessionCookie(session.id)
      cookies().set(
         sessionCookie.name,
         sessionCookie.value,
         sessionCookie.attributes
      )

      return { error: "" }
   } catch (error) {
      return { error: "Something went wrong. Please try again." }
   }
}

export const signUpAction = async (data: signUpFormProps): Promise<{ error: string }> => {

   try {

      // Check if email exist in the db
      const existingEmail = await db.user.findFirst({
         where: {
            email: {
               equals: data.email,
               mode: "insensitive"
            }
         }
      })

      if (existingEmail) {
         return { error: "Email already exist." }
      }

      // Generate hash password
      const passwordHash = await hash(data.password, {
         memoryCost: 19456,
         timeCost: 2,
         outputLen: 32,
         parallelism: 1,
      })

      // Create new user
      const user = await db.user.create({
         data: {
            fullName: data.fullName,
            email: data.email,
            password: passwordHash,
            isDeleted: false
         },
      })

      // Create user session using Lucia
      const session = await lucia.createSession(user.id.toString(), {})
      const sessionCookie = await lucia.createSessionCookie(session.id)
      cookies().set(
         sessionCookie.name,
         sessionCookie.value,
         sessionCookie.attributes
      )

      return { error: "" }
   } catch (error) {
      console.log(error)
      return { error: "Registration failed. Please try again." }
   }
}

export const logOutAction = async () => {
   const sessionCookie = await lucia.createBlankSessionCookie()
   cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
   return redirect('/signin')
}