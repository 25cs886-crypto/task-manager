import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import MainLayout from "../layouts/MainLayout.jsx";
import useTasks from "../hooks/useTasks.js";
import TaskFormModal from "../components/TaskFormModal.jsx";
import TaskCard from "../components/TaskCard.jsx";
import SearchBar from "../components/SearchBar.jsx";
import FilterDropdown from "../components/FilterDropdown.jsx";
import EmptyState from "../components/EmptyState.jsx";
import SkeletonTaskCard from "../components/SkeletonTaskCard.jsx";
import ConfirmationModal from "../components/ConfirmationModal.jsx";
import useInfiniteScroll from "../hooks/useInfiniteScroll.js";
import {
	PRIORITY_OPTIONS,
	SORT_DROPDOWN_OPTIONS,
	STATUS_OPTIONS,
} from "../utils/constants.js";

const Dashboard = () => {
	const {
		tasks,
		loading,
		loadingMore,
		filters,
		analytics,
		pagination,
		setFilter,
		fetchNextPage,
		createTask,
		updateTask,
		deleteTask,
		updateStatus,
		reorder,
	} = useTasks();

	const [modalOpen, setModalOpen] = useState(false);
	const [selectedTask, setSelectedTask] = useState(null);
	const [draggedTaskId, setDraggedTaskId] = useState("");
	const [taskToDelete, setTaskToDelete] = useState(null);

	const sentinelRef = useInfiniteScroll(fetchNextPage, pagination.hasNextPage);

	const metrics = useMemo(
		() => [
			{ label: "Total Tasks", value: analytics.totalTasks },
			{ label: "Completed", value: analytics.completedTasks },
			{ label: "Pending", value: analytics.pendingTasks },
			{ label: "Completion Rate", value: `${analytics.completionRate}%` },
		],
		[analytics],
	);

	const handleDrop = (targetTaskId) => {
		if (!draggedTaskId || draggedTaskId === targetTaskId) {
			return;
		}

		const dragIndex = tasks.findIndex((task) => task._id === draggedTaskId);
		const targetIndex = tasks.findIndex((task) => task._id === targetTaskId);
		if (dragIndex < 0 || targetIndex < 0) {
			return;
		}

		const updated = [...tasks];
		const [dragged] = updated.splice(dragIndex, 1);
		updated.splice(targetIndex, 0, dragged);
		reorder(updated);
		setDraggedTaskId("");
	};

	return (
		<MainLayout>
			<div className="space-y-6">
				<section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
					{metrics.map((item, index) => (
						<motion.article
							key={item.label}
							initial={{ opacity: 0, y: 12 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: index * 0.05 }}
							className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
						>
							<p className="text-xs uppercase tracking-wider text-slate-500">
								{item.label}
							</p>
							<p className="mt-2 text-3xl font-extrabold">{item.value}</p>
						</motion.article>
					))}
				</section>

				<section className="rounded-3xl border border-slate-200 bg-white/80 p-4 shadow-panel dark:border-slate-800 dark:bg-slate-900/80">
					<div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
						<div className="grid flex-1 gap-3 md:grid-cols-3">
							<SearchBar
								value={filters.search}
								onChange={(value) => setFilter({ search: value })}
							/>
							<FilterDropdown
								label="Status"
								value={filters.status}
								onChange={(value) => setFilter({ status: value })}
								options={STATUS_OPTIONS}
							/>
							<FilterDropdown
								label="Priority"
								value={filters.priority}
								onChange={(value) => setFilter({ priority: value })}
								options={PRIORITY_OPTIONS}
							/>
						</div>

						<div className="flex flex-col gap-3 sm:flex-row">
							<FilterDropdown
								label="Sort"
								value={filters.sortBy}
								onChange={(value) => setFilter({ sortBy: value })}
								options={SORT_DROPDOWN_OPTIONS}
							/>
							<button
								type="button"
								onClick={() => {
									setSelectedTask(null);
									setModalOpen(true);
								}}
								className="focus-ring self-end rounded-xl bg-brand-500 px-4 py-2.5 text-sm font-semibold text-white"
							>
								Add Task
							</button>
						</div>
					</div>

					<div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
						{loading ? (
							Array.from({ length: 6 }).map((_, index) => (
								<SkeletonTaskCard key={index} />
							))
						) : tasks.length === 0 ? (
							<div className="md:col-span-2 xl:col-span-3">
								<EmptyState
									title="No tasks found"
									description="Create your first task or adjust filters to see matching results."
								/>
							</div>
						) : (
							tasks.map((task) => (
								<TaskCard
									key={task._id}
									task={task}
									onEdit={(activeTask) => {
										setSelectedTask(activeTask);
										setModalOpen(true);
									}}
									onDelete={setTaskToDelete}
									onToggleStatus={updateStatus}
									onDragStart={setDraggedTaskId}
									onDrop={handleDrop}
								/>
							))
						)}
					</div>

					<div ref={sentinelRef} className="mt-4 h-4" />
					{loadingMore ? (
						<p className="text-center text-sm text-slate-500">
							Loading more...
						</p>
					) : null}
				</section>
			</div>

			<TaskFormModal
				open={modalOpen}
				task={selectedTask}
				onClose={() => setModalOpen(false)}
				onSubmit={(payload) => {
					if (selectedTask) {
						updateTask(selectedTask._id, payload);
						return;
					}
					createTask(payload);
				}}
			/>

			<ConfirmationModal
				open={Boolean(taskToDelete)}
				title="Delete task"
				description="This action cannot be undone."
				onCancel={() => setTaskToDelete(null)}
				onConfirm={() => {
					deleteTask(taskToDelete._id);
					setTaskToDelete(null);
				}}
				confirmLabel="Delete"
			/>
		</MainLayout>
	);
};

export default Dashboard;
