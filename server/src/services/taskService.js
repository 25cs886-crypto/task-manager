import Task from "../models/Task.js";
import ApiError from "../utils/ApiError.js";

const priorityWeight = {
	high: 3,
	medium: 2,
	low: 1,
};

const buildQuery = (userId, query) => {
	const filters = { userId };

	if (query.status && query.status !== "all") {
		filters.status = query.status;
	}

	if (query.priority && query.priority !== "all") {
		filters.priority = query.priority;
	}

	if (query.search) {
		filters.$or = [
			{ title: { $regex: query.search, $options: "i" } },
			{ description: { $regex: query.search, $options: "i" } },
		];
	}

	return filters;
};

const sortMap = {
	latest: { createdAt: -1 },
	dueDate: { dueDate: 1, createdAt: -1 },
	priority: { priority: -1, createdAt: -1 },
	custom: { order: 1, createdAt: -1 },
};

export const getTasks = async (userId, query) => {
	const page = Number(query.page || 1);
	const limit = Number(query.limit || 20);
	const skip = (page - 1) * limit;
	const filters = buildQuery(userId, query);
	const sort = sortMap[query.sortBy] || sortMap.latest;

	const [tasks, total] = await Promise.all([
		Task.find(filters).sort(sort).skip(skip).limit(limit),
		Task.countDocuments(filters),
	]);

	return {
		tasks,
		pagination: {
			page,
			limit,
			total,
			hasNextPage: skip + tasks.length < total,
		},
	};
};

export const createTask = async (userId, payload) => {
	const count = await Task.countDocuments({ userId });

	const task = await Task.create({
		...payload,
		userId,
		priority: payload.priority?.toLowerCase() || "medium",
		order: count + 1,
	});

	return task;
};

export const updateTask = async (userId, taskId, payload) => {
	const task = await Task.findOne({ _id: taskId, userId });
	if (!task) {
		throw new ApiError(404, "Task not found");
	}

	if (payload.title !== undefined) task.title = payload.title;
	if (payload.description !== undefined) task.description = payload.description;
	if (payload.dueDate !== undefined) task.dueDate = payload.dueDate;
	if (payload.status !== undefined) task.status = payload.status.toLowerCase();
	if (payload.priority !== undefined)
		task.priority = payload.priority.toLowerCase();

	await task.save();
	return task;
};

export const updateTaskStatus = async (userId, taskId, status) => {
	const task = await Task.findOne({ _id: taskId, userId });
	if (!task) {
		throw new ApiError(404, "Task not found");
	}

	task.status = status.toLowerCase();
	await task.save();
	return task;
};

export const deleteTask = async (userId, taskId) => {
	const deletedTask = await Task.findOneAndDelete({ _id: taskId, userId });
	if (!deletedTask) {
		throw new ApiError(404, "Task not found");
	}

	return deletedTask;
};

export const reorderTasks = async (userId, taskIds) => {
	await Promise.all(
		taskIds.map((taskId, index) =>
			Task.findOneAndUpdate({ _id: taskId, userId }, { order: index + 1 }),
		),
	);

	const tasks = await Task.find({ userId }).sort({ order: 1 });
	return tasks;
};

export const getTaskAnalytics = async (userId) => {
	const tasks = await Task.find({ userId });

	const totalTasks = tasks.length;
	const completedTasks = tasks.filter(
		(task) => task.status === "completed",
	).length;
	const pendingTasks = totalTasks - completedTasks;

	const productivity = tasks.reduce(
		(acc, task) => {
			const bucket = task.status === "completed" ? "completed" : "pending";
			acc[bucket] += priorityWeight[task.priority] || 1;
			return acc;
		},
		{ completed: 0, pending: 0 },
	);

	return {
		totalTasks,
		completedTasks,
		pendingTasks,
		completionRate: totalTasks
			? Math.round((completedTasks / totalTasks) * 100)
			: 0,
		productivity,
	};
};
