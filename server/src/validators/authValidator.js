const isEmail = (value) => /^(?:[\w.-]+)@(?:[\w-]+\.)+[\w-]{2,}$/.test(value);

export const validateRegister = (req) => {
	const { name, email, password } = req.body;
	const errors = [];

	if (!name || name.trim().length < 2) {
		errors.push("Name must be at least 2 characters long");
	}

	if (!email || !isEmail(email)) {
		errors.push("A valid email is required");
	}

	if (!password || password.length < 6) {
		errors.push("Password must be at least 6 characters long");
	}

	return {
		isValid: errors.length === 0,
		errors,
	};
};

export const validateLogin = (req) => {
	const { email, password } = req.body;
	const errors = [];

	if (!email || !isEmail(email)) {
		errors.push("A valid email is required");
	}

	if (!password || password.length < 6) {
		errors.push("Password must be at least 6 characters long");
	}

	return {
		isValid: errors.length === 0,
		errors,
	};
};

export const validateProfileUpdate = (req) => {
	const { name, avatar } = req.body;
	const errors = [];

	if (name && name.trim().length < 2) {
		errors.push("Name must be at least 2 characters long");
	}

	if (avatar && avatar.length > 500) {
		errors.push("Avatar URL is too long");
	}

	return {
		isValid: errors.length === 0,
		errors,
	};
};
