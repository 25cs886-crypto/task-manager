import express from "express";
import {
	addTask,
	analytics,
	editTask,
	getAllTasks,
	patchTaskStatus,
	removeTask,
	updateOrder,
} from "../controllers/taskController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import validate from "../middleware/validateMiddleware.js";
import {
	validateCreateTask,
	validateUpdateStatus,
	validateUpdateTask,
} from "../validators/taskValidator.js";

const router = express.Router();

router.use(authMiddleware);

router.get("/", getAllTasks);
router.post("/", validate(validateCreateTask), addTask);
router.put("/:id", validate(validateUpdateTask), editTask);
router.delete("/:id", removeTask);
router.patch("/:id/status", validate(validateUpdateStatus), patchTaskStatus);
router.patch("/reorder/list", updateOrder);
router.get("/analytics/summary", analytics);

export default router;
