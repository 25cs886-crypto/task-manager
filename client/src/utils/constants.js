export const TASK_STATUS = {
	ALL: "all",
	PENDING: "pending",
	COMPLETED: "completed",
};

export const TASK_PRIORITY = {
	LOW: "low",
	MEDIUM: "medium",
	HIGH: "high",
};

export const SORT_OPTIONS = {
	LATEST: "latest",
	DUE_DATE: "dueDate",
	PRIORITY: "priority",
	CUSTOM: "custom",
};

export const STATUS_OPTIONS = [
	{ value: TASK_STATUS.ALL, label: "All" },
	{ value: TASK_STATUS.PENDING, label: "Pending" },
	{ value: TASK_STATUS.COMPLETED, label: "Completed" },
];

export const PRIORITY_OPTIONS = [
	{ value: "all", label: "All Priorities" },
	{ value: TASK_PRIORITY.HIGH, label: "High" },
	{ value: TASK_PRIORITY.MEDIUM, label: "Medium" },
	{ value: TASK_PRIORITY.LOW, label: "Low" },
];

export const SORT_DROPDOWN_OPTIONS = [
	{ value: SORT_OPTIONS.LATEST, label: "Latest" },
	{ value: SORT_OPTIONS.DUE_DATE, label: "Due Date" },
	{ value: SORT_OPTIONS.PRIORITY, label: "Priority" },
	{ value: SORT_OPTIONS.CUSTOM, label: "Custom" },
];
