import bodyParser from "body-parser";
import cors from "cors";
import "dotenv-flow/config";
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { createMessage } from "./database/index.ts";
import { aiRouter, chatRoomMessagesRouter, chatRoomsRouter, usersRouter } from "./routes";
import { ChatMessageReceiveEventsData, ChatMessageSendEventsData, ChatWatchEventsData, OChatEvent } from "./types";

const port = process.env.PORT;
const client1Url = `http://localhost:${process.env.CLIENT_1_PORT}`;
const client2Url = `http://localhost:${process.env.CLIENT_2_PORT}`;
const client3Url = `http://localhost:${process.env.CLIENT_3_PORT}`;

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { origin: [client1Url, client2Url, client3Url] } });

io.on("connection", (socket) => {
	socket.on(OChatEvent.Watch, ({ chatRoomId }: ChatWatchEventsData) => {
		console.log("User joined chat room");

		socket.join("chat-" + chatRoomId);
	});

	socket.on(OChatEvent.Unwatch, ({ chatRoomId }: ChatWatchEventsData) => {
		console.log("User left chat room");

		socket.leave("chat-" + chatRoomId);
	});

	socket.on(OChatEvent.MessageNew, (data: ChatMessageSendEventsData) => {
		console.log("User send message to the chat room, data:", data);

		const message: ChatMessageReceiveEventsData = createMessage({
			chatRoomId: data.chatRoomId,
			text: data.message,
			senderId: data.senderId,
			timestamp: new Date(),
		});

		io.to("chat-" + data.chatRoomId).emit(OChatEvent.MessageNew, message);
	});
});

app.use(bodyParser.json());
app.use(cors({ origin: [client1Url, client2Url, client3Url] }));

app.use("/chat-rooms", chatRoomsRouter);
app.use("/chat-rooms", chatRoomMessagesRouter);
app.use("/users", usersRouter);
app.use("/ai", aiRouter);

httpServer.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
