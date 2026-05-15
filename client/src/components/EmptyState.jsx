const EmptyState = ({ title, description, action }) => {
	return (
		<div className="rounded-3xl border border-dashed border-slate-300 bg-white/70 p-10 text-center shadow-panel dark:border-slate-700 dark:bg-slate-900/80">
			<h3 className="text-xl font700">{title}</h3>
			<p className="mx-auto mt-3 max-w-md text-slate-500 dark:text-slate-300">
				{description}
			</p>
			{action ? <div className="mt-6">{action}</div> : null}
		</div>
	);
};

export default EmptyState;
