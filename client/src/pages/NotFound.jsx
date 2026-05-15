import { Link } from "react-router-dom";

const NotFound = () => {
	return (
		<div className="flex min-h-screen items-center justify-center px-4">
			<div className="text-center">
				<p className="text-sm uppercase tracking-widest text-slate-500">404</p>
				<h1 className="mt-2 text-4xl font-black">Page not found</h1>
				<p className="mt-2 text-slate-500 dark:text-slate-300">
					The page you requested does not exist.
				</p>
				<Link
					to="/dashboard"
					className="mt-5 inline-block rounded-xl bg-brand-500 px-4 py-2 text-sm font-semibold text-white"
				>
					Go to Dashboard
				</Link>
			</div>
		</div>
	);
};

export default NotFound;
