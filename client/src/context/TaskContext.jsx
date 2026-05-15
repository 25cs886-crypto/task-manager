import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";
import { io } from "socket.io-client";
import toast from "react-hot-toast";
import {
	createTaskRequest,
	deleteTaskRequest,
	getTaskAnalyticsRequest,
	getTasksRequest,
	reorderTasksRequest,
	updateTaskRequest,
	updateTaskStatusRequest,
} from "../services/taskService.js";
import { SORT_OPTIONS } from "../utils/constants.js";
import useDebounce from "../hooks/useDebounce.js";
import { useAuthContext } from "./AuthContext.jsx";

const TaskContext = createContext(null);

const getSocketBaseUrl = () => {
	const apiUrl = import.meta.env.VITE_API_URL || "/api";

	if (apiUrl.startsWith("/")) {
		return window.location.origin;
	}

	try {
		return new URL(apiUrl).origin;
	} catch {
		return window.location.origin;
	}
};

const defaultFilters = {
	status: "all",
	priority: "all",
	sortBy: SORT_OPTIONS.LATEST,
	search: "",
};

export const TaskProvider = ({ children }) => {
	const { isAuthenticated, token, user } = useAuthContext();
	const [tasks, setTasks] = useState([]);
	const [filters, setFilters] = useState(defaultFilters);
	const [loading, setLoading] = useState(false);
	const [loadingMore, setLoadingMore] = useState(false);
	const [error, setError] = useState("");
	const [pagination, setPagination] = useState({ page: 1, hasNextPage: false });
	const [analytics, setAnalytics] = useState({
		totalTasks: 0,
		completedTasks: 0,
		pendingTasks: 0,
		completionRate: 0,
	});
	const socketRef = useRef(null);
	const debouncedSearch = useDebounce(filters.search, 400);

	const fetchAnalytics = useCallback(async () => {
		if (!isAuthenticated) {
			return;
		}

		try {
			const summary = await getTaskAnalyticsRequest();
			setAnalytics(summary);
		} catch {
			setAnalytics({
				totalTasks: 0,
				completedTasks: 0,
				pendingTasks: 0,
				completionRate: 0,
			});
		}
	}, [isAuthenticated]);

	const fetchTasks = useCallback(
		async (page = 1, append = false) => {
			if (!isAuthenticated) {
				return;
			}

			setError("");
			append ? setLoadingMore(true) : setLoading(true);

			try {
				const data = await getTasksRequest({
					...filters,
					search: debouncedSearch,
					page,
					limit: 12,
				});

				setTasks((prev) => (append ? [...prev, ...data.tasks] : data.tasks));
				setPagination(data.pagination);
			} catch (err) {
				setError(err.message);
			} finally {
				setLoading(false);
				setLoadingMore(false);
			}
		},
		[debouncedSearch, filters, isAuthenticated],
	);

	useEffect(() => {
		fetchTasks(1);
		fetchAnalytics();
	}, [
		debouncedSearch,
		fetchTasks,
		fetchAnalytics,
		filters.priority,
		filters.sortBy,
		filters.status,
	]);

	useEffect(() => {
		if (!isAuthenticated || !token) {
			socketRef.current?.disconnect();
			socketRef.current = null;
			return;
		}

		socketRef.current = io(getSocketBaseUrl(), {
			auth: { token: `Bearer ${token}` },
		});

		const socket = socketRef.current;

		socket.on("task:created", (task) => setTasks((prev) => [task, ...prev]));
		socket.on("task:updated", (incomingTask) => {
			setTasks((prev) =>
				prev.map((task) =>
					task._id === incomingTask._id ? incomingTask : task,
				),
			);
			toast.success("Task updated in realtime");
		});
		socket.on("task:deleted", ({ id }) =>
			setTasks((prev) => prev.filter((task) => task._id !== id)),
		);
		socket.on("task:status", (incomingTask) => {
			setTasks((prev) =>
				prev.map((task) =>
					task._id === incomingTask._id ? incomingTask : task,
				),
			);
		});
		socket.on("task:reordered", (incomingTasks) => setTasks(incomingTasks));

		return () => {
			socket.disconnect();
		};
	}, [isAuthenticated, token, user]);

	const createTask = async (payload) => {
		const optimisticTask = {
			_id: `temp-${Date.now()}`,
			title: payload.title,
			description: payload.description,
			status: payload.status || "pending",
			priority: payload.priority || "medium",
			dueDate: payload.dueDate,
			createdAt: new Date().toISOString(),
		};

		setTasks((prev) => [optimisticTask, ...prev]);

		try {
			const created = await createTaskRequest(payload);
			setTasks((prev) =>
				prev.map((task) => (task._id === optimisticTask._id ? created : task)),
			);
			fetchAnalytics();
			toast.success("Task created");
		} catch (error) {
			setTasks((prev) =>
				prev.filter((task) => task._id !== optimisticTask._id),
			);
			toast.error(error.message);
		}
	};

	const updateTask = async (id, payload) => {
		const previous = tasks;
		setTasks((prev) =>
			prev.map((task) => (task._id === id ? { ...task, ...payload } : task)),
		);

		try {
			await updateTaskRequest(id, payload);
			fetchAnalytics();
			toast.success("Task saved");
		} catch (error) {
			setTasks(previous);
			toast.error(error.message);
		}
	};

	const deleteTask = async (id) => {
		const previous = tasks;
		setTasks((prev) => prev.filter((task) => task._id !== id));

		try {
			await deleteTaskRequest(id);
			fetchAnalytics();
			toast.success("Task deleted");
		} catch (error) {
			setTasks(previous);
			toast.error(error.message);
		}
	};

	const updateStatus = async (id, status) => {
		const previous = tasks;
		setTasks((prev) =>
			prev.map((task) => (task._id === id ? { ...task, status } : task)),
		);

		try {
			await updateTaskStatusRequest(id, status);
			fetchAnalytics();
		} catch (error) {
			setTasks(previous);
			toast.error(error.message);
		}
	};

	const reorder = async (orderedTasks) => {
		setTasks(orderedTasks);

		try {
			await reorderTasksRequest(orderedTasks.map((task) => task._id));
		} catch (error) {
			toast.error(error.message);
			fetchTasks(1);
		}
	};

	const setFilter = (nextFilters) => {
		setFilters((prev) => ({ ...prev, ...nextFilters }));
	};

	const fetchNextPage = async () => {
		if (!pagination.hasNextPage || loadingMore) {
			return;
		}

		const nextPage = pagination.page + 1;
		await fetchTasks(nextPage, true);
	};

	const value = useMemo(
		() => ({
			tasks,
			loading,
			loadingMore,
			error,
			filters,
			analytics,
			pagination,
			setFilter,
			fetchTasks,
			fetchNextPage,
			createTask,
			updateTask,
			deleteTask,
			updateStatus,
			reorder,
		}),
		[
			tasks,
			loading,
			loadingMore,
			error,
			filters,
			analytics,
			pagination,
			fetchTasks,
		],
	);

	return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

export const useTaskContext = () => {
	const context = useContext(TaskContext);
	if (!context) {
		throw new Error("useTaskContext must be used within TaskProvider");
	}
	return context;
};
