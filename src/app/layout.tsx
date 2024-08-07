import "@/styles/globals.css"
import { Karla as FontSans } from "next/font/google"
import { Analytics } from '@vercel/analytics/react';

import { cn } from "@/lib/utils"
import { TRPCReactProvider } from "@/trpc/react";

const fontSans = FontSans({
	subsets: ["latin"],
	variable: "--font-sans",
})

export default function RootLayout({ children }: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head />
			<body
				className={cn(
					"min-h-screen bg-background font-sans antialiased",
					fontSans.variable
				)}
			>
				<TRPCReactProvider>
					{children}
				</TRPCReactProvider>
				<Analytics />
			</body>
		</html>
	)
}