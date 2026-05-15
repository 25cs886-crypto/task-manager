import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth.js";
import Loader from "./Loader.jsx";

const ProtectedRoute = ({ children }) => {
	const { isAuthenticated, isAuthLoading } = useAuth();
	const location = useLocation();

	if (isAuthLoading) {
		return <Loader text="Checking session..." />;
	}

	if (!isAuthenticated) {
		return <Navigate to="/login" state={{ from: location }} replace />;
	}

	return children;
};

export default ProtectedRoute;
