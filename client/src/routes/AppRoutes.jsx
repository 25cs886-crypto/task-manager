import { Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Loader from "../components/Loader.jsx";
import ProtectedRoute from "../components/ProtectedRoute.jsx";
import useAuth from "../hooks/useAuth.js";

const Login = lazy(() => import("../pages/Login.jsx"));
const Register = lazy(() => import("../pages/Register.jsx"));
const Dashboard = lazy(() => import("../pages/Dashboard.jsx"));
const Profile = lazy(() => import("../pages/Profile.jsx"));
const NotFound = lazy(() => import("../pages/NotFound.jsx"));

const PublicOnlyRoute = ({ children }) => {
	const { isAuthenticated, isAuthLoading } = useAuth();

	if (isAuthLoading) {
		return <Loader text="Checking session..." />;
	}

	if (isAuthenticated) {
		return <Navigate to="/dashboard" replace />;
	}

	return children;
};

const AppRoutes = () => {
	return (
		<Suspense fallback={<Loader text="Loading page..." />}>
			<Routes>
				<Route
					path="/login"
					element={
						<PublicOnlyRoute>
							<Login />
						</PublicOnlyRoute>
					}
				/>
				<Route
					path="/register"
					element={
						<PublicOnlyRoute>
							<Register />
						</PublicOnlyRoute>
					}
				/>
				<Route
					path="/dashboard"
					element={
						<ProtectedRoute>
							<Dashboard />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/profile"
					element={
						<ProtectedRoute>
							<Profile />
						</ProtectedRoute>
					}
				/>
				<Route path="/" element={<Navigate to="/dashboard" replace />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</Suspense>
	);
};

export default AppRoutes;
