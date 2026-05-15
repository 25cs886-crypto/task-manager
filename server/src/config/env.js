import dotenv from "dotenv";

dotenv.config();

const isProduction = process.env.NODE_ENV === "production";

const mongoUri =
	process.env.MONGODB_URI ||
	(!isProduction ? "mongodb://127.0.0.1:27017/task-manager" : "");

const jwtSecret =
	process.env.JWT_SECRET || (!isProduction ? "dev-task-manager-secret" : "");

if (isProduction) {
	["MONGODB_URI", "JWT_SECRET"].forEach((key) => {
		if (!process.env[key]) {
			throw new Error(`Missing required environment variable: ${key}`);
		}
	});
}

const env = {
	nodeEnv: process.env.NODE_ENV || "development",
	port: Number(process.env.PORT || 5000),
	clientUrl: process.env.CLIENT_URL || "http://localhost:5173",
	mongoUri,
	jwtSecret,
	jwtExpiresIn: process.env.JWT_EXPIRES_IN || "7d",
};

if (!isProduction && (!process.env.MONGODB_URI || !process.env.JWT_SECRET)) {
	console.warn(
		"Using local development defaults for missing MONGODB_URI and/or JWT_SECRET.",
	);
}

export default env;
