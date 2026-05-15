import { createContext, useContext, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import {
	loginRequest,
	meRequest,
	registerRequest,
	updateProfileRequest,
} from "../services/authService.js";

const AuthContext = createContext(null);

const tokenKey = "tm_token";

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [isAuthLoading, setIsAuthLoading] = useState(true);

	useEffect(() => {
		const bootstrap = async () => {
			const token = localStorage.getItem(tokenKey);

			if (!token) {
				setIsAuthLoading(false);
				return;
			}

			try {
				const profile = await meRequest();
				setUser(profile);
			} catch (error) {
				localStorage.removeItem(tokenKey);
			} finally {
				setIsAuthLoading(false);
			}
		};

		bootstrap();
	}, []);

	const login = async (payload) => {
		const { user: loggedInUser, token } = await loginRequest(payload);
		localStorage.setItem(tokenKey, token);
		setUser(loggedInUser);
		toast.success("Welcome back");
	};

	const register = async (payload) => {
		const { user: registeredUser, token } = await registerRequest(payload);
		localStorage.setItem(tokenKey, token);
		setUser(registeredUser);
		toast.success("Account created successfully");
	};

	const logout = () => {
		localStorage.removeItem(tokenKey);
		setUser(null);
		toast.success("Logged out");
	};

	const updateProfile = async (payload) => {
		const profile = await updateProfileRequest(payload);
		setUser(profile);
		toast.success("Profile updated");
	};

	const value = useMemo(
		() => ({
			user,
			isAuthenticated: Boolean(user),
			isAuthLoading,
			login,
			register,
			logout,
			updateProfile,
			token: localStorage.getItem(tokenKey),
		}),
		[isAuthLoading, user],
	);

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuthContext must be used within AuthProvider");
	}
	return context;
};
