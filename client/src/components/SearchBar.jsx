const SearchBar = ({ value, onChange }) => {
	return (
		<div className="relative w-full">
			<input
				type="text"
				value={value}
				onChange={(event) => onChange(event.target.value)}
				placeholder="Search by title or description"
				className="focus-ring w-full rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm shadow-sm placeholder:text-slate-400 dark:border-slate-700 dark:bg-slate-900"
			/>
		</div>
	);
};

export default SearchBar;
