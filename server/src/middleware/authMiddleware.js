import User from "../models/User.js";
import asyncHandler from "./asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import { verifyToken } from "../utils/token.js";

const authMiddleware = asyncHandler(async (req, res, next) => {
	const authHeader = req.headers.authorization;

	if (!authHeader?.startsWith("Bearer ")) {
		throw new ApiError(401, "Unauthorized: missing bearer token");
	}

	const token = authHeader.split(" ")[1];
	const decoded = verifyToken(token);

	const user = await User.findById(decoded.userId).select("-password");
	if (!user) {
		throw new ApiError(401, "Unauthorized: invalid token");
	}

	req.user = user;
	next();
});

export default authMiddleware;
