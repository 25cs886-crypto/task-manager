import asyncHandler from "../middleware/asyncHandler.js";
import { sendPaginated, sendSuccess } from "../utils/response.js";
import {
	createTask,
	deleteTask,
	getTaskAnalytics,
	getTasks,
	reorderTasks,
	updateTask,
	updateTaskStatus,
} from "../services/taskService.js";

export const getAllTasks = asyncHandler(async (req, res) => {
	const { tasks, pagination } = await getTasks(req.user._id, req.query);
	sendPaginated(res, 200, "Tasks fetched successfully", { tasks }, pagination);
});

export const addTask = asyncHandler(async (req, res) => {
	const task = await createTask(req.user._id, req.body);
	req.io.to(req.user._id.toString()).emit("task:created", task);
	sendSuccess(res, 201, "Task created successfully", { task });
});

export const editTask = asyncHandler(async (req, res) => {
	const task = await updateTask(req.user._id, req.params.id, req.body);
	req.io.to(req.user._id.toString()).emit("task:updated", task);
	sendSuccess(res, 200, "Task updated successfully", { task });
});

export const removeTask = asyncHandler(async (req, res) => {
	const task = await deleteTask(req.user._id, req.params.id);
	req.io.to(req.user._id.toString()).emit("task:deleted", { id: task._id });
	sendSuccess(res, 200, "Task deleted successfully", { id: task._id });
});

export const patchTaskStatus = asyncHandler(async (req, res) => {
	const task = await updateTaskStatus(
		req.user._id,
		req.params.id,
		req.body.status,
	);
	req.io.to(req.user._id.toString()).emit("task:status", task);
	sendSuccess(res, 200, "Task status updated successfully", { task });
});

export const updateOrder = asyncHandler(async (req, res) => {
	const tasks = await reorderTasks(req.user._id, req.body.taskIds || []);
	req.io.to(req.user._id.toString()).emit("task:reordered", tasks);
	sendSuccess(res, 200, "Task order updated successfully", { tasks });
});

export const analytics = asyncHandler(async (req, res) => {
	const data = await getTaskAnalytics(req.user._id);
	sendSuccess(res, 200, "Analytics fetched successfully", data);
});
