import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout.jsx";
import { validateAuthForm } from "../utils/validateForm.js";
import useAuth from "../hooks/useAuth.js";

const Login = () => {
	const [form, setForm] = useState({ email: "", password: "" });
	const [errors, setErrors] = useState({});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const { login } = useAuth();
	const navigate = useNavigate();
	const location = useLocation();

	const handleSubmit = async (event) => {
		event.preventDefault();
		const nextErrors = validateAuthForm(form);
		setErrors(nextErrors);
		if (Object.keys(nextErrors).length > 0) {
			return;
		}

		setIsSubmitting(true);
		try {
			await login(form);
			navigate(location.state?.from?.pathname || "/dashboard", {
				replace: true,
			});
		} catch (error) {
			setErrors({ api: error.message });
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<AuthLayout
			title="Welcome Back"
			subtitle="Sign in to continue managing your tasks"
		>
			<form onSubmit={handleSubmit} className="space-y-4">
				<label className="block text-sm font-medium">
					Email
					<input
						type="email"
						value={form.email}
						onChange={(event) =>
							setForm((prev) => ({ ...prev, email: event.target.value }))
						}
						className="focus-ring mt-1.5 w-full rounded-xl border border-slate-200 px-3 py-2 dark:border-slate-700 dark:bg-slate-800"
					/>
					{errors.email ? (
						<span className="mt-1 text-xs text-rose-600">{errors.email}</span>
					) : null}
				</label>

				<label className="block text-sm font-medium">
					Password
					<input
						type="password"
						value={form.password}
						onChange={(event) =>
							setForm((prev) => ({ ...prev, password: event.target.value }))
						}
						className="focus-ring mt-1.5 w-full rounded-xl border border-slate-200 px-3 py-2 dark:border-slate-700 dark:bg-slate-800"
					/>
					{errors.password ? (
						<span className="mt-1 text-xs text-rose-600">
							{errors.password}
						</span>
					) : null}
				</label>

				{errors.api ? (
					<p className="text-sm text-rose-600">{errors.api}</p>
				) : null}

				<button
					type="submit"
					disabled={isSubmitting}
					className="focus-ring w-full rounded-xl bg-brand-500 py-2.5 font-semibold text-white disabled:opacity-70"
				>
					{isSubmitting ? "Signing in..." : "Sign In"}
				</button>

				<p className="text-sm text-slate-500 dark:text-slate-300">
					No account?{" "}
					<Link to="/register" className="font-semibold text-brand-500">
						Create one
					</Link>
				</p>
			</form>
		</AuthLayout>
	);
};

export default Login;
