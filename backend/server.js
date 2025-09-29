import "dotenv/config";
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const port = process.env.PORT;

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

io.on("connection", (socket) => {
	console.log("User connected to the socket.io server");

	socket.emit("server-message", { timestamp: new Date().toISOString(), message: "Hello from the server" });

	socket.on("client-message", (message) => {
		console.log("User message received:", message);
	});
});

httpServer.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
