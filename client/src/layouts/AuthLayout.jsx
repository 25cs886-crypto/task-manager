import { motion } from "framer-motion";

const AuthLayout = ({ title, subtitle, children }) => {
	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-100 via-brand-50 to-emerald-50 px-4 py-10 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900 md:px-8">
			<motion.div
				initial={{ opacity: 0, y: 14 }}
				animate={{ opacity: 1, y: 0 }}
				className="mx-auto max-w-lg rounded-3xl border border-white/70 bg-white/80 p-8 shadow-panel backdrop-blur dark:border-slate-800 dark:bg-slate-900/75"
			>
				<h1 className="text-3xl font-extrabold">{title}</h1>
				<p className="mt-2 text-sm text-slate-500 dark:text-slate-300">
					{subtitle}
				</p>
				<div className="mt-6">{children}</div>
			</motion.div>
		</div>
	);
};

export default AuthLayout;
