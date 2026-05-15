import http from "http";
import app from "./app.js";
import env from "./config/env.js";
import { connectDB } from "./config/db.js";
import { createSocketServer } from "./sockets/socketHandler.js";

const startServer = async () => {
	await connectDB(env.mongoUri);

	const httpServer = http.createServer(app);
	const io = createSocketServer(httpServer);

	app.set("io", io);

	httpServer.listen(env.port, () => {
		console.log(`Server running on port ${env.port}`);
	});
};

startServer().catch((error) => {
	console.error("Failed to start server", error);
	process.exit(1);
});
