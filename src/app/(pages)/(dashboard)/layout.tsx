//#region Import
import HeaderLayout from "@/components/layout/header";
import SidebarLayout from "@/components/layout/sidebar";
//#endregion

const MainLayout = async ({ children }: Readonly<{
	children: React.ReactNode;
}>) => {
	return (
		<div className="flex">
			<SidebarLayout />
			<main className="w-full flex-1 overflow-hidden">
				<HeaderLayout />
				<div className="py-6 px-8 bg-gray-50 h-full">
					{children}
				</div>
			</main>
		</div>
	)
}

export default MainLayout;
