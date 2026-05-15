import { memo } from "react";
import { motion } from "framer-motion";
import clsx from "clsx";
import { formatDate, relativeDate } from "../utils/formatDate.js";

const priorityStyles = {
	low: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-200",
	medium:
		"bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-200",
	high: "bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-200",
};

const TaskCard = ({
	task,
	onEdit,
	onDelete,
	onToggleStatus,
	onDragStart,
	onDrop,
}) => {
	const isCompleted = task.status === "completed";

	return (
		<motion.article
			layout
			draggable
			onDragStart={() => onDragStart(task._id)}
			onDragOver={(event) => event.preventDefault()}
			onDrop={() => onDrop(task._id)}
			whileHover={{ y: -2 }}
			className={clsx(
				"group rounded-2xl border bg-white p-4 shadow-sm transition dark:bg-slate-900",
				isCompleted
					? "border-emerald-200 dark:border-emerald-800/60"
					: "border-slate-200 dark:border-slate-700",
			)}
		>
			<div className="flex items-start justify-between gap-4">
				<div>
					<h3
						className={clsx(
							"text-base font-semibold",
							isCompleted && "line-through opacity-70",
						)}
					>
						{task.title}
					</h3>
					<p className="mt-1 line-clamp-2 text-sm text-slate-500 dark:text-slate-300">
						{task.description || "No description"}
					</p>
				</div>
				<span
					className={clsx(
						"rounded-full px-3 py-1 text-xs font-semibold capitalize",
						priorityStyles[task.priority],
					)}
				>
					{task.priority}
				</span>
			</div>

			<div className="mt-4 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
				<span>{formatDate(task.dueDate)}</span>
				<span>{relativeDate(task.dueDate)}</span>
			</div>

			<div className="mt-4 flex flex-wrap items-center gap-2">
				<button
					type="button"
					onClick={() =>
						onToggleStatus(task._id, isCompleted ? "pending" : "completed")
					}
					className={clsx(
						"focus-ring rounded-xl px-3 py-1.5 text-xs font-semibold",
						isCompleted
							? "bg-slate-100 dark:bg-slate-700"
							: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-100",
					)}
				>
					{isCompleted ? "Mark Pending" : "Mark Complete"}
				</button>
				<button
					type="button"
					onClick={() => onEdit(task)}
					className="focus-ring rounded-xl border border-slate-200 px-3 py-1.5 text-xs dark:border-slate-700"
				>
					Edit
				</button>
				<button
					type="button"
					onClick={() => onDelete(task)}
					className="focus-ring rounded-xl border border-rose-200 px-3 py-1.5 text-xs text-rose-600 dark:border-rose-800"
				>
					Delete
				</button>
			</div>
		</motion.article>
	);
};

export default memo(TaskCard);
