import bodyParser from "body-parser";
import cors from "cors";
import "dotenv/config";
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { ChatMessageEventsData, ChatWatchEventsData, OChatEvent } from "./chatEvent.type.ts";
import { chatRoomMessagesRouter, chatRoomsRouter, usersRouter } from "./routes";

const port = process.env.PORT;
const clientPort = process.env.CLIENT_PORT;
const clientUrl = `http://localhost:${clientPort}`;

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { origin: clientUrl } });

io.on("connection", (socket) => {
	socket.on(OChatEvent.Watch, ({ chatRoomId }: ChatWatchEventsData) => {
		console.log("User joined chat room");
		socket.join("chat-" + chatRoomId);
	});

	socket.on(OChatEvent.Unwatch, ({ chatRoomId }: ChatWatchEventsData) => {
		console.log("User left chat room");
		socket.leave("chat-" + chatRoomId);
	});

	socket.on(OChatEvent.MessageNew, (data: ChatMessageEventsData) => {
		console.log("User send message to the chat room, data:", data);
		socket.broadcast.to("chat-" + data.chatRoomId).emit(OChatEvent.MessageNew, data);
	});
});

app.use(bodyParser.json());
app.use(cors({ origin: clientUrl }));

app.use("/chat-rooms", chatRoomsRouter);
app.use("/chat-rooms/:chatRoomId", chatRoomMessagesRouter);
app.use("/users", usersRouter);

httpServer.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
