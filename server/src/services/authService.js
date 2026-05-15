import User from "../models/User.js";
import ApiError from "../utils/ApiError.js";
import { signToken } from "../utils/token.js";

const safeUser = (user) => ({
	id: user._id,
	name: user.name,
	email: user.email,
	avatar: user.avatar,
	createdAt: user.createdAt,
	updatedAt: user.updatedAt,
});

export const registerUser = async ({ name, email, password }) => {
	const existingUser = await User.findOne({ email });
	if (existingUser) {
		throw new ApiError(409, "Email already registered");
	}

	const user = await User.create({ name, email, password });
	const token = signToken({ userId: user._id });

	return { token, user: safeUser(user) };
};

export const loginUser = async ({ email, password }) => {
	const user = await User.findOne({ email }).select("+password");
	if (!user) {
		throw new ApiError(401, "Invalid email or password");
	}

	const isPasswordCorrect = await user.comparePassword(password);
	if (!isPasswordCorrect) {
		throw new ApiError(401, "Invalid email or password");
	}

	const token = signToken({ userId: user._id });
	return { token, user: safeUser(user) };
};

export const getCurrentUser = async (userId) => {
	const user = await User.findById(userId);
	if (!user) {
		throw new ApiError(404, "User not found");
	}

	return safeUser(user);
};

export const updateProfile = async (userId, payload) => {
	const user = await User.findById(userId);
	if (!user) {
		throw new ApiError(404, "User not found");
	}

	if (payload.name) {
		user.name = payload.name;
	}

	if (payload.avatar !== undefined) {
		user.avatar = payload.avatar;
	}

	await user.save();
	return safeUser(user);
};
