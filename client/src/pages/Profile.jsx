import { useState } from "react";
import MainLayout from "../layouts/MainLayout.jsx";
import useAuth from "../hooks/useAuth.js";

const Profile = () => {
	const { user, updateProfile } = useAuth();
	const [form, setForm] = useState({
		name: user?.name || "",
		avatar: user?.avatar || "",
	});
	const [saving, setSaving] = useState(false);

	const handleSubmit = async (event) => {
		event.preventDefault();
		setSaving(true);

		try {
			await updateProfile(form);
		} finally {
			setSaving(false);
		}
	};

	return (
		<MainLayout>
			<section className="mx-auto max-w-2xl rounded-3xl border border-slate-200 bg-white p-6 shadow-panel dark:border-slate-800 dark:bg-slate-900">
				<h1 className="text-2xl font-extrabold">My Profile</h1>
				<p className="mt-1 text-sm text-slate-500 dark:text-slate-300">
					Update your account information and avatar URL.
				</p>

				<form className="mt-6 space-y-4" onSubmit={handleSubmit}>
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
					</label>

					<label className="block text-sm font-medium">
						Avatar URL
						<input
							type="url"
							value={form.avatar}
							onChange={(event) =>
								setForm((prev) => ({ ...prev, avatar: event.target.value }))
							}
							className="focus-ring mt-1.5 w-full rounded-xl border border-slate-200 px-3 py-2 dark:border-slate-700 dark:bg-slate-800"
						/>
					</label>

					<button
						type="submit"
						disabled={saving}
						className="focus-ring rounded-xl bg-brand-500 px-4 py-2 text-sm font-semibold text-white disabled:opacity-70"
					>
						{saving ? "Saving..." : "Save Profile"}
					</button>
				</form>
			</section>
		</MainLayout>
	);
};

export default Profile;
