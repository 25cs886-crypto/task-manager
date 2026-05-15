const validPriorities = ["low", "medium", "high"];
const validStatus = ["pending", "completed"];

export const validateCreateTask = (req) => {
	const { title, description, dueDate, priority } = req.body;
	const errors = [];

	if (!title || title.trim().length < 2) {
		errors.push("Title must be at least 2 characters long");
	}

	if (description && description.length > 1000) {
		errors.push("Description can be at most 1000 characters");
	}

	if (dueDate && Number.isNaN(Date.parse(dueDate))) {
		errors.push("Due date must be a valid date");
	}

	if (priority && !validPriorities.includes(priority.toLowerCase())) {
		errors.push("Priority must be low, medium, or high");
	}

	return {
		isValid: errors.length === 0,
		errors,
	};
};

export const validateUpdateTask = (req) => {
	const { title, description, dueDate, priority, status } = req.body;
	const errors = [];

	if (title && title.trim().length < 2) {
		errors.push("Title must be at least 2 characters long");
	}

	if (description && description.length > 1000) {
		errors.push("Description can be at most 1000 characters");
	}

	if (dueDate && Number.isNaN(Date.parse(dueDate))) {
		errors.push("Due date must be a valid date");
	}

	if (priority && !validPriorities.includes(priority.toLowerCase())) {
		errors.push("Priority must be low, medium, or high");
	}

	if (status && !validStatus.includes(status.toLowerCase())) {
		errors.push("Status must be pending or completed");
	}

	return {
		isValid: errors.length === 0,
		errors,
	};
};

export const validateUpdateStatus = (req) => {
	const { status } = req.body;
	const errors = [];

	if (!status || !validStatus.includes(status.toLowerCase())) {
		errors.push("Status must be pending or completed");
	}

	return {
		isValid: errors.length === 0,
		errors,
	};
};
