import clsx from "clsx";
import { NavLink } from "react-router-dom";

const links = [
	{ to: "/dashboard", label: "Dashboard" },
	{ to: "/profile", label: "Profile" },
];

const Sidebar = ({ open, onClose }) => {
	return (
		<aside
			className={clsx(
				"fixed inset-y-0 left-0 z-40 w-72 transform border-r border-slate-200 bg-white/95 p-6 shadow-panel transition-transform duration-300 dark:border-slate-800 dark:bg-slate-950/95 lg:translate-x-0",
				open ? "translate-x-0" : "-translate-x-full",
			)}
		>
			<div className="mb-9 flex items-center justify-between lg:block">
				<p className="text-xl font-extrabold text-brand-500">Flowboard</p>
				<button
					type="button"
					onClick={onClose}
					className="rounded-lg p-2 text-slate-500 lg:hidden"
				>
					X
				</button>
			</div>

			<nav className="space-y-2">
				{links.map((link) => (
					<NavLink
						key={link.to}
						to={link.to}
						onClick={onClose}
						className={({ isActive }) =>
							clsx(
								"block rounded-xl px-4 py-2.5 text-sm font-semibold transition",
								isActive
									? "bg-brand-500 text-white"
									: "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800",
							)
						}
					>
						{link.label}
					</NavLink>
				))}
			</nav>
		</aside>
	);
};

export default Sidebar;
