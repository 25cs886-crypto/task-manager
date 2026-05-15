export const formatDate = (input) => {
	if (!input) {
		return "-";
	}

	return new Date(input).toLocaleDateString(undefined, {
		day: "2-digit",
		month: "short",
		year: "numeric",
	});
};

export const relativeDate = (input) => {
	if (!input) {
		return "";
	}

	const now = new Date();
	const target = new Date(input);
	const diffDays = Math.ceil((target - now) / (1000 * 60 * 60 * 24));

	if (diffDays < 0) {
		return `Overdue by ${Math.abs(diffDays)}d`;
	}

	if (diffDays === 0) {
		return "Due today";
	}

	return `Due in ${diffDays}d`;
};
