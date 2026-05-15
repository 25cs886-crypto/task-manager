export const validateAuthForm = (
	{ name, email, password },
	isRegister = false,
) => {
	const errors = {};

	if (isRegister && (!name || name.trim().length < 2)) {
		errors.name = "Name must be at least 2 characters long";
	}

	if (!email || !/^(?:[\w.-]+)@(?:[\w-]+\.)+[\w-]{2,}$/.test(email)) {
		errors.email = "A valid email is required";
	}

	if (!password || password.length < 6) {
		errors.password = "Password must be at least 6 characters";
	}

	return errors;
};

export const validateTaskForm = ({ title, description }) => {
	const errors = {};

	if (!title || title.trim().length < 2) {
		errors.title = "Title must be at least 2 characters long";
	}

	if (description && description.length > 1000) {
		errors.description = "Description cannot exceed 1000 characters";
	}

	return errors;
};
