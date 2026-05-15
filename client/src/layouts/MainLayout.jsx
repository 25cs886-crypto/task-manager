import { useState } from "react";
import Navbar from "../components/Navbar.jsx";
import Sidebar from "../components/Sidebar.jsx";

const MainLayout = ({ children }) => {
	const [sidebarOpen, setSidebarOpen] = useState(false);

	return (
		<div className="min-h-screen">
			<Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
			<div className="lg:pl-72">
				<Navbar onMenuClick={() => setSidebarOpen((prev) => !prev)} />
				<main className="px-4 py-6 md:px-8">{children}</main>
			</div>
		</div>
	);
};

export default MainLayout;
