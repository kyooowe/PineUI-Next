"use client"

//#region Import
import Link from "next/link"

import {
	CircleUser,
	Home,
	Menu,
	Bell,
	Settings,
	ListCollapse,
	ListChecks,
	BellPlus,
	AppWindow,
	Code,
	Sparkles,
	User,
	Keyboard,
	LogOut
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbSeparator
} from "@/components/ui/breadcrumb"
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
	Sheet,
	SheetContent,
	SheetTrigger
} from "@/components/ui/sheet"

import { logOutAction } from "@/app/(pages)/(auth)/action"
//#endregion

const HeaderLayout = () => {

	return (
		<header className="flex h-14 items-center gap-4 border-b px-4 lg:h-[60px] lg:px-6">
			<Sheet>
				<SheetTrigger asChild>
					<Button
						variant="ghost"
						size="icon"
						className="shrink-0 md:hidden"
					>
						<Menu className="h-5 w-5" />
						<span className="sr-only">Toggle navigation menu</span>
					</Button>
				</SheetTrigger>
				<SheetContent side="left" className="flex flex-col">
					<nav className="grid gap-2 text-sm font-medium">
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
					<div className="mt-auto">
						<Card>
							<CardHeader>
								<CardTitle>Upgrade to Pro</CardTitle>
								<CardDescription>
									Unlock all features and get unlimited access to our
									support team.
								</CardDescription>
							</CardHeader>
							<CardContent>
								<Button size="sm" className="w-full">
									Upgrade
								</Button>
							</CardContent>
						</Card>
					</div>
				</SheetContent>
			</Sheet>

			<div className="w-full flex-1">
				<Breadcrumb>
					<BreadcrumbList>
						<BreadcrumbItem>
							<BreadcrumbLink>
								<Link href="/dashboard">Demo</Link>
							</BreadcrumbLink>
						</BreadcrumbItem>
						<BreadcrumbSeparator />
						<BreadcrumbItem>
							<BreadcrumbLink>
								<Link href="/dashboard">Breadcrumb</Link>
							</BreadcrumbLink>
						</BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb>
			</div>

			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="secondary" size="icon" className="rounded-full">
						<Bell className="h-5 w-5" />
						<span className="sr-only">Toggle notification</span>
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end">
					<DropdownMenuLabel>Notifications</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuItem>
						<BellPlus className="mr-2 h-4 w-4" />
						<span className="mr-8">Student #1 - Edited</span>
						<DropdownMenuShortcut>1hr ago</DropdownMenuShortcut>
					</DropdownMenuItem>
					<DropdownMenuItem>
						<BellPlus className="mr-2 h-4 w-4" />
						<span className="mr-8">Student #2 - Deleted</span>
						<DropdownMenuShortcut>21hrs ago</DropdownMenuShortcut>
					</DropdownMenuItem>
					<DropdownMenuSeparator />
					<DropdownMenuItem>
						<ListCollapse className="mr-2 h-4 w-4" />
						<span className="mr-8">Show All Notifications</span>
						<DropdownMenuShortcut>⌘N+S</DropdownMenuShortcut>
					</DropdownMenuItem>
					<DropdownMenuItem>
						<ListChecks className="mr-2 h-4 w-4" />
						<span className="mr-8">Mark All as Read</span>
						<DropdownMenuShortcut>⌘N+A</DropdownMenuShortcut>
					</DropdownMenuItem>
					<DropdownMenuSeparator />
					<DropdownMenuItem>
						<Settings className="mr-2 h-4 w-4" />
						<span className="mr-8">Manage Notifications</span>
						<DropdownMenuShortcut>⌘N+M</DropdownMenuShortcut>
					</DropdownMenuItem>

				</DropdownMenuContent>
			</DropdownMenu>

			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="secondary" size="icon" className="rounded-full">
						<CircleUser className="h-5 w-5" />
						<span className="sr-only">Toggle user menu</span>
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end">
					<DropdownMenuLabel>My Account</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuItem>
						<User className="mr-2 h-4 w-4" />
						<span className="mr-8">Profile</span>
						<DropdownMenuShortcut>⌘A+P</DropdownMenuShortcut>
					</DropdownMenuItem>
					<DropdownMenuItem>
						<Settings className="mr-2 h-4 w-4" />
						<span className="mr-8">Settings</span>
						<DropdownMenuShortcut>⌘A+S</DropdownMenuShortcut>
					</DropdownMenuItem>
					<DropdownMenuItem>
						<Keyboard className="mr-2 h-4 w-4" />
						<span className="mr-8">Keyboard Shortcuts</span>
						<DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
					</DropdownMenuItem>
					<DropdownMenuSeparator />
					<DropdownMenuItem onClick={() => logOutAction()}>
						<LogOut className="mr-2 h-4 w-4" />
						<span className="mr-8">Logout</span>
						<DropdownMenuShortcut>⌘Q</DropdownMenuShortcut>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</header>
	)
}

export default HeaderLayout;