import ApiError from "../utils/ApiError.js";

export const notFound = (req, res, next) => {
	next(new ApiError(404, `Route not found: ${req.originalUrl}`));
};

export const errorHandler = (error, req, res, next) => {
	const statusCode = error.statusCode || 500;
	const response = {
		success: false,
		message: error.message || "Internal server error",
	};

	if (error.details) {
		response.details = error.details;
	}

	if (process.env.NODE_ENV !== "production") {
		response.stack = error.stack;
	}

	res.status(statusCode).json(response);
};
