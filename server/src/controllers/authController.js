import asyncHandler from "../middleware/asyncHandler.js";
import { sendSuccess } from "../utils/response.js";
import {
	getCurrentUser,
	loginUser,
	registerUser,
	updateProfile,
} from "../services/authService.js";

export const register = asyncHandler(async (req, res) => {
	const result = await registerUser(req.body);
	sendSuccess(res, 201, "Registration successful", result);
});

export const login = asyncHandler(async (req, res) => {
	const result = await loginUser(req.body);
	sendSuccess(res, 200, "Login successful", result);
});

export const me = asyncHandler(async (req, res) => {
	const user = await getCurrentUser(req.user._id);
	sendSuccess(res, 200, "User profile fetched", { user });
});

export const updateMe = asyncHandler(async (req, res) => {
	const user = await updateProfile(req.user._id, req.body);
	sendSuccess(res, 200, "Profile updated successfully", { user });
});
