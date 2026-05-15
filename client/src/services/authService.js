import api from "./api.js";

export const registerRequest = async (payload) => {
	const response = await api.post("/auth/register", payload);
	return response.data.data;
};

export const loginRequest = async (payload) => {
	const response = await api.post("/auth/login", payload);
	return response.data.data;
};

export const meRequest = async () => {
	const response = await api.get("/auth/me");
	return response.data.data.user;
};

export const updateProfileRequest = async (payload) => {
	const response = await api.put("/auth/me", payload);
	return response.data.data.user;
};
