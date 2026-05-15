const SkeletonTaskCard = () => {
	return (
		<div className="animate-pulse rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900">
			<div className="h-4 w-2/3 rounded bg-slate-200 dark:bg-slate-700" />
			<div className="mt-3 h-3 w-full rounded bg-slate-200 dark:bg-slate-700" />
			<div className="mt-2 h-3 w-1/2 rounded bg-slate-200 dark:bg-slate-700" />
			<div className="mt-5 h-8 w-24 rounded bg-slate-200 dark:bg-slate-700" />
		</div>
	);
};

export default SkeletonTaskCard;
