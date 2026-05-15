import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
			trim: true,
			minlength: 2,
			maxlength: 180,
		},
		description: {
			type: String,
			trim: true,
			maxlength: 1000,
			default: "",
		},
		status: {
			type: String,
			enum: ["pending", "completed"],
			default: "pending",
			index: true,
		},
		priority: {
			type: String,
			enum: ["low", "medium", "high"],
			default: "medium",
			index: true,
		},
		dueDate: {
			type: Date,
			default: null,
			index: true,
		},
		order: {
			type: Number,
			default: 0,
		},
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
			index: true,
		},
	},
	{ timestamps: true },
);

taskSchema.index({ userId: 1, createdAt: -1 });

const Task = mongoose.model("Task", taskSchema);

export default Task;
