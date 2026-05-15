import axios from "axios";
import toast from "react-hot-toast";

const baseURL = (import.meta.env.VITE_API_URL || "/api").replace(/\/$/, "");

const api = axios.create({
	baseURL,
	timeout: 15000,
});

api.interceptors.request.use((config) => {
	const token = localStorage.getItem("tm_token");

	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}

	return config;
});

api.interceptors.response.use(
	(response) => response,
	(error) => {
		const message =
			error.response?.data?.message || error.message || "Request failed";

		if (error.response?.status >= 500) {
			toast.error("Server error. Please try again shortly.");
		}

		return Promise.reject(new Error(message));
	},
);

export default api;
