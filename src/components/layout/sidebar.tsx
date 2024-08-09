'use client';

//#region Import
import Link from 'next/link';

import { ChevronLeft, Rocket } from 'lucide-react';

import { cn } from '@/lib/utils';

import { useSidebar } from '@/hooks/useSideBar';

import { navItems } from '@/constant/nav';

import { DashboardNav } from '../ui/dashboard-nav';
//#endregion

interface SidebarProps {
	className?: string;
};

export default function Sidebar({ className }: SidebarProps) {
	const { isMinimized, toggle } = useSidebar();

	const handleToggle = () => {
		toggle();
	};

	return (
		<aside
			className={cn(
				`relative hidden h-screen flex-none border-r bg-card transition-[width] duration-500 md:block`,
				!isMinimized ? 'w-72' : 'w-[72px]',
				className
			)}
		>
			<div className="hidden p-5 pt-10 lg:block">
				<div className='flex flex-row'>
					<Link
						href="/"
					>
						<Rocket className="h-6 w-6 ml-1 mt-0.5" />
					</Link>
					{
						!isMinimized && (
							<span
								className={`flex-none ml-3 text-xl font-bold bg-gradient-to-r text-transparent bg-clip-text from-blue-500 to-violet-600
                         ${isMinimized ? 'animate-fadeOut' : 'animate-fadeIn'}`}
							>
								Pine UI - MERN
							</span>
						)
					}
				</div>
			</div>
			<ChevronLeft
				className={cn(
					'absolute -right-3 top-10 z-50  cursor-pointer rounded-full border bg-background text-3xl text-foreground',
					isMinimized && 'rotate-180'
				)}
				onClick={handleToggle}
			/>
			<div className="space-y-4 py-3">
				<div className="px-3 py-1">
					<div className="mt-3 space-y-1">
						<DashboardNav items={navItems} />
					</div>
				</div>
			</div>
		</aside>
	);
}
