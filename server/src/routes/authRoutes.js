import express from "express";
import {
	login,
	me,
	register,
	updateMe,
} from "../controllers/authController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import validate from "../middleware/validateMiddleware.js";
import {
	validateLogin,
	validateProfileUpdate,
	validateRegister,
} from "../validators/authValidator.js";

const router = express.Router();

router.post("/register", validate(validateRegister), register);
router.post("/login", validate(validateLogin), login);
router.get("/me", authMiddleware, me);
router.put("/me", authMiddleware, validate(validateProfileUpdate), updateMe);

export default router;
