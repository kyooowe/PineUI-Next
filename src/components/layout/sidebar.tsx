"use client"

//#region Import
import Link from "next/link"
import {
	AppWindow,
	Code,
	Home,
	Rocket,
	Sparkles,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
//#endregion

const SidebarLayout = () => {
	return (
		<div className="flex h-full max-h-screen flex-col gap-2">
			<div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
				<Link href="/" className="flex items-center gap-2 font-semibold">
					<Rocket className="h-6 w-6" />
					<span className="flex-none bg-gradient-to-r text-transparent bg-clip-text from-blue-500 to-violet-600">Pine UI - MERN</span>
				</Link>
			</div>
			<div className="flex-1">
				<nav className="grid items-start px-2 text-sm font-medium lg:px-4">
					<Link
						href="#"
						className="flex items-center gap-3 rounded-lg px-3 py-2 text-primary transition-all hover:text-primary"
					>
						<Home className="h-4 w-4" />
						Dashboard
					</Link>
					<Link
						href="#"
						className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
					>
						<AppWindow className="h-4 w-4" />
						CRUD
					</Link>
					<Link
						href="#"
						className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
					>
						<Code className="h-4 w-4" />
						Components
						<Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
							6
						</Badge>
					</Link>
					<Link
						href="#"
						className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
					>
						<Sparkles className="h-4 w-4" />
						Starter
					</Link>
					
				</nav>
			</div>
			<div className="mt-auto p-4">
				<Card x-chunk="dashboard-02-chunk-0">
					<CardHeader className="p-2 pt-0 md:p-4">
						<CardTitle>Upgrade to Pro</CardTitle>
						<CardDescription>
							Unlock all features and get unlimited access to our support
							team.
						</CardDescription>
					</CardHeader>
					<CardContent className="p-2 pt-0 md:p-4 md:pt-0">
						<Button size="sm" className="w-full">
							Upgrade
						</Button>
					</CardContent>
				</Card>
			</div>
		</div>
	)
}

export default SidebarLayout;