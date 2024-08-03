"use client"

//#region Import
import { useState, useTransition } from "react"

import { redirect } from "next/navigation"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { signInAction } from "@/app/(pages)/(auth)/action"

import { AlertCircle } from "lucide-react"

import { cn } from "@/lib/utils"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import LoadingButton from "@/components/ui/loading-button"
import { Icons } from '@/components/ui/icons'

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
//#endregion

const formSchema = z.object({
	email: z.string().email({
		message: "Invalid email address."
	}),
	password: z.string().min(4, {
		message: "Password must be at least 4 characters."
	})
})

const SignInForm = () => {

	//#region State
	const [isPending, startTransition] = useTransition()

	const [hasError, setHasError] = useState<boolean>(false)
	const [errorMessage, setErrorMessage] = useState<string>("")

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
			password: ""
		}
	})
	//#endregion

	//#region Handler
	const onSubmit = async (data: z.infer<typeof formSchema>) => {

		startTransition(async () => {
			const { error } = await signInAction(data)

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
								name="email"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="text-muted-foreground">Email Address</FormLabel>
										<FormControl>
											<Input placeholder="john@email.com" {...field} />
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
						</div>
						<LoadingButton loading={isPending} type="submit">
							Login Account
						</LoadingButton>
					</div>
				</form>
			</Form>
			<div className="relative mt-3">
				<div className="absolute inset-0 flex items-center">
					<span className="w-full border-t" />
				</div>
				<div className="relative flex justify-center text-xs uppercase">
					<span className="bg-background px-2 text-muted-foreground">
						Or continue with
					</span>
				</div>
			</div>
			<div className="grid gap-2 mt-3">
				<Button className="w-full" variant="outline" type="button">
					<Icons.google className="mr-2 h-3 w-3" />
					Google
				</Button>
				<Button className="w-full" variant="outline" type="button">
					<Icons.gitHub className="mr-2 h-3 w-3" />
					Github
				</Button>
			</div>
		</div>
	)
}

export type signInFormProps = z.infer<typeof formSchema>
export default SignInForm