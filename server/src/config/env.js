import dotenv from "dotenv";

dotenv.config();

const requiredVars = ["MONGODB_URI", "JWT_SECRET"];

requiredVars.forEach((key) => {
	if (!process.env[key]) {
		throw new Error(`Missing required environment variable: ${key}`);
	}
});

const env = {
	nodeEnv: process.env.NODE_ENV || "development",
	port: Number(process.env.PORT || 5000),
	clientUrl: process.env.CLIENT_URL || "http://localhost:5173",
	mongoUri: process.env.MONGODB_URI,
	jwtSecret: process.env.JWT_SECRET,
	jwtExpiresIn: process.env.JWT_EXPIRES_IN || "7d",
};

export default env;
