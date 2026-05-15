import api from "./api.js";

export const getTasksRequest = async (params) => {
	const response = await api.get("/tasks", { params });
	return {
		tasks: response.data.data.tasks,
		pagination: response.data.pagination,
	};
};

export const createTaskRequest = async (payload) => {
	const response = await api.post("/tasks", payload);
	return response.data.data.task;
};

export const updateTaskRequest = async (id, payload) => {
	const response = await api.put(`/tasks/${id}`, payload);
	return response.data.data.task;
};

export const deleteTaskRequest = async (id) => {
	await api.delete(`/tasks/${id}`);
};

export const updateTaskStatusRequest = async (id, status) => {
	const response = await api.patch(`/tasks/${id}/status`, { status });
	return response.data.data.task;
};

export const reorderTasksRequest = async (taskIds) => {
	const response = await api.patch("/tasks/reorder/list", { taskIds });
	return response.data.data.tasks;
};

export const getTaskAnalyticsRequest = async () => {
	const response = await api.get("/tasks/analytics/summary");
	return response.data.data;
};
