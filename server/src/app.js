import express from "express";
import cors from "cors";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import { corsOptions } from "./config/corsOptions.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

const app = express();

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	max: 500,
	standardHeaders: true,
	legacyHeaders: false,
});

app.use(helmet());
app.use(cors(corsOptions));
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(mongoSanitize());
app.use(limiter);

if (process.env.NODE_ENV !== "production") {
	app.use(morgan("dev"));
}

app.get("/api/health", (req, res) => {
	res.status(200).json({ success: true, message: "API healthy" });
});

app.use((req, res, next) => {
	req.io = app.get("io");
	next();
});

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
