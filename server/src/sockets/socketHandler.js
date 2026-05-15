import { Server } from "socket.io";
import { corsOptions } from "../config/corsOptions.js";
import { verifyToken } from "../utils/token.js";

export const createSocketServer = (httpServer) => {
	const io = new Server(httpServer, {
		cors: corsOptions,
	});

	io.use((socket, next) => {
		try {
			const rawToken = socket.handshake.auth?.token;
			const token = rawToken?.replace("Bearer ", "");

			if (!token) {
				return next(new Error("Socket unauthorized"));
			}

			const decoded = verifyToken(token);
			socket.userId = decoded.userId;
			return next();
		} catch (error) {
			return next(new Error("Socket unauthorized"));
		}
	});

	io.on("connection", (socket) => {
		socket.join(socket.userId);

		socket.on("disconnect", () => {
			socket.leave(socket.userId);
		});
	});

	return io;
};
