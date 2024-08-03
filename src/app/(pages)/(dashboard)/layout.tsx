//#region Import
import HeaderLayout from "@/components/layout/header";
import SidebarLayout from "@/components/layout/sidebar";
//#endregion

const MainLayout = async ({ children }: Readonly<{
	children: React.ReactNode;
}>) => {
	return (
		<div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
			<div className="hidden border-r md:block">
				<SidebarLayout />
			</div>
			<div className="flex flex-col">
				<HeaderLayout />

				<main className="flex flex-1 flex-col gap-4 p-4 bg-muted lg:gap-6 lg:p-6">
					{children}
				</main>
			</div>
		</div>
	)
}

export default MainLayout;
