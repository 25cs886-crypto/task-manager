import { useTheme } from "../context/ThemeContext.jsx";
import useAuth from "../hooks/useAuth.js";

const Navbar = ({ onMenuClick }) => {
	const { user, logout } = useAuth();
	const { theme, toggleTheme } = useTheme();

	return (
		<header className="sticky top-0 z-30 border-b border-slate-200 bg-white/80 px-4 py-3 backdrop-blur dark:border-slate-800 dark:bg-slate-950/70 md:px-8">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-3">
					<button
						type="button"
						onClick={onMenuClick}
						className="rounded-xl border border-slate-200 px-3 py-2 text-sm dark:border-slate-700 lg:hidden"
					>
						Menu
					</button>
					<div>
						<p className="text-xs uppercase tracking-wider text-slate-500">
							Welcome
						</p>
						<p className="text-base font-semibold">{user?.name || "User"}</p>
					</div>
				</div>

				<div className="flex items-center gap-2">
					<button
						type="button"
						onClick={toggleTheme}
						className="focus-ring rounded-xl border border-slate-200 px-3 py-2 text-sm dark:border-slate-700"
					>
						{theme === "dark" ? "Light" : "Dark"}
					</button>
					<button
						type="button"
						onClick={logout}
						className="focus-ring rounded-xl bg-slate-900 px-3 py-2 text-sm text-white dark:bg-slate-100 dark:text-slate-900"
					>
						Logout
					</button>
				</div>
			</div>
		</header>
	);
};

export default Navbar;
