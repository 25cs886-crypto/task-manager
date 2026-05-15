import ApiError from "../utils/ApiError.js";

const validate = (validator) => {
	return (req, res, next) => {
		const result = validator(req);

		if (!result.isValid) {
			return next(new ApiError(400, "Validation failed", result.errors));
		}

		next();
	};
};

export default validate;
