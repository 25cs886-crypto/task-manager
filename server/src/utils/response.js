export const sendSuccess = (res, statusCode, message, data = null) => {
	res.status(statusCode).json({
		success: true,
		message,
		data,
	});
};

export const sendPaginated = (res, statusCode, message, data, pagination) => {
	res.status(statusCode).json({
		success: true,
		message,
		data,
		pagination,
	});
};
