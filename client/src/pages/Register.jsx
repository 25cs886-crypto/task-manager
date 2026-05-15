import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout.jsx";
import { validateAuthForm } from "../utils/validateForm.js";
import useAuth from "../hooks/useAuth.js";

const Register = () => {
	const [form, setForm] = useState({ name: "", email: "", password: "" });
	const [errors, setErrors] = useState({});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const { register } = useAuth();
	const navigate = useNavigate();

	const handleSubmit = async (event) => {
		event.preventDefault();
		const nextErrors = validateAuthForm(form, true);
		setErrors(nextErrors);
		if (Object.keys(nextErrors).length > 0) {
			return;
		}

		setIsSubmitting(true);
		try {
			await register(form);
			navigate("/dashboard", { replace: true });
		} catch (error) {
			setErrors({ api: error.message });
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<AuthLayout
			title="Create Account"
			subtitle="Set up your workspace in under a minute"
		>
			<form onSubmit={handleSubmit} className="space-y-4">
				<label className="block text-sm font-medium">
					Name
					<input
						type="text"
						value={form.name}
						onChange={(event) =>
							setForm((prev) => ({ ...prev, name: event.target.value }))
						}
						className="focus-ring mt-1.5 w-full rounded-xl border border-slate-200 px-3 py-2 dark:border-slate-700 dark:bg-slate-800"
					/>
					{errors.name ? (
						<span className="mt-1 text-xs text-rose-600">{errors.name}</span>
					) : null}
				</label>

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
					{isSubmitting ? "Creating account..." : "Create Account"}
				</button>

				<p className="text-sm text-slate-500 dark:text-slate-300">
					Already have an account?{" "}
					<Link to="/login" className="font-semibold text-brand-500">
						Sign in
					</Link>
				</p>
			</form>
		</AuthLayout>
	);
};

export default Register;
