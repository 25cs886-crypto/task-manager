import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { TASK_PRIORITY } from "../utils/constants.js";
import { validateTaskForm } from "../utils/validateForm.js";

const initialValues = {
	title: "",
	description: "",
	priority: TASK_PRIORITY.MEDIUM,
	dueDate: "",
};

const TaskFormModal = ({ open, onClose, onSubmit, task }) => {
	const [form, setForm] = useState(initialValues);
	const [errors, setErrors] = useState({});

	useEffect(() => {
		if (!task) {
			setForm(initialValues);
			return;
		}

		setForm({
			title: task.title,
			description: task.description,
			priority: task.priority,
			dueDate: task.dueDate ? task.dueDate.slice(0, 10) : "",
		});
	}, [task]);

	const handleSubmit = (event) => {
		event.preventDefault();
		const nextErrors = validateTaskForm(form);
		setErrors(nextErrors);

		if (Object.keys(nextErrors).length > 0) {
			return;
		}

		onSubmit({
			...form,
			dueDate: form.dueDate ? new Date(form.dueDate).toISOString() : null,
		});
		onClose();
	};

	return (
		<AnimatePresence>
			{open ? (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-5"
				>
					<motion.form
						initial={{ y: 30, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						exit={{ y: 16, opacity: 0 }}
						onSubmit={handleSubmit}
						className="w-full max-w-xl rounded-3xl bg-white p-6 shadow-panel dark:bg-slate-900"
					>
						<h3 className="text-2xl font-bold">
							{task ? "Edit Task" : "Add Task"}
						</h3>
						<div className="mt-5 space-y-4">
							<label className="block text-sm font-medium">
								Title
								<input
									type="text"
									value={form.title}
									onChange={(event) =>
										setForm((prev) => ({ ...prev, title: event.target.value }))
									}
									className="focus-ring mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-800"
								/>
								{errors.title ? (
									<span className="mt-1 text-xs text-rose-600">
										{errors.title}
									</span>
								) : null}
							</label>

							<label className="block text-sm font-medium">
								Description
								<textarea
									rows="4"
									value={form.description}
									onChange={(event) =>
										setForm((prev) => ({
											...prev,
											description: event.target.value,
										}))
									}
									className="focus-ring mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-800"
								/>
							</label>

							<div className="grid gap-4 sm:grid-cols-2">
								<label className="block text-sm font-medium">
									Priority
									<select
										value={form.priority}
										onChange={(event) =>
											setForm((prev) => ({
												...prev,
												priority: event.target.value,
											}))
										}
										className="focus-ring mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-800"
									>
										<option value={TASK_PRIORITY.LOW}>Low</option>
										<option value={TASK_PRIORITY.MEDIUM}>Medium</option>
										<option value={TASK_PRIORITY.HIGH}>High</option>
									</select>
								</label>

								<label className="block text-sm font-medium">
									Due Date
									<input
										type="date"
										value={form.dueDate}
										onChange={(event) =>
											setForm((prev) => ({
												...prev,
												dueDate: event.target.value,
											}))
										}
										className="focus-ring mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-800"
									/>
								</label>
							</div>
						</div>

						<div className="mt-6 flex justify-end gap-3">
							<button
								type="button"
								onClick={onClose}
								className="focus-ring rounded-xl border border-slate-200 px-4 py-2 dark:border-slate-700"
							>
								Cancel
							</button>
							<button
								type="submit"
								className="focus-ring rounded-xl bg-brand-500 px-4 py-2 font-semibold text-white"
							>
								{task ? "Save Changes" : "Create Task"}
							</button>
						</div>
					</motion.form>
				</motion.div>
			) : null}
		</AnimatePresence>
	);
};

export default TaskFormModal;
