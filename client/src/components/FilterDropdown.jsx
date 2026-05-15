const FilterDropdown = ({ value, onChange, options, label }) => {
	return (
		<label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-300">
			{label}
			<select
				value={value}
				onChange={(event) => onChange(event.target.value)}
				className="focus-ring mt-1.5 block w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
			>
				{options.map((option) => (
					<option key={option.value} value={option.value}>
						{option.label}
					</option>
				))}
			</select>
		</label>
	);
};

export default FilterDropdown;
