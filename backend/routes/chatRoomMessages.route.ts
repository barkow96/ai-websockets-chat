import express from "express";
import { dbMessages } from "../database";

const router = express.Router();

router.get("/:chatRoomId/messages", (req, res) => {
	const { chatRoomId } = req.params;
	const roomMessages = dbMessages.filter((m) => m.chatRoomId === chatRoomId);

	res.json(roomMessages);
});

router.post("/:chatRoomId/messages", (req, res) => {
	const { chatRoomId } = req.params;
	const { text, senderId } = req.body;

	if (!text || !senderId) {
		return res.status(400).json({ error: "Text and senderId are required" });
	}

	const newMessage = {
		id: Date.now().toString(),
		chatRoomId: `${chatRoomId}`,
		text: `${text}`,
		senderId: `${senderId}`,
		timestamp: new Date(),
	};

	dbMessages.push(newMessage);
	res.status(201).json(newMessage);
});

router.delete("/:chatRoomId/messages/:messageId", (req, res) => {
	const { messageId } = req.params;
	const messageIndex = dbMessages.findIndex((m) => m.id === messageId);

	if (messageIndex === -1) {
		return res.status(404).json({ error: "Message not found" });
	}

	dbMessages.splice(messageIndex, 1);
	res.status(204).send();
});

export default router;
