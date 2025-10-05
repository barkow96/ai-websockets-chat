import express from "express";
import { createMessage, deleteMessage, getMessagesByChatRoomId, updateMessage } from "../database";

const router = express.Router();

router.get("/:chatRoomId/messages", (req, res) => {
	const { chatRoomId } = req.params;
	const roomMessages = getMessagesByChatRoomId(chatRoomId);

	res.json(roomMessages);
});

router.post("/:chatRoomId/messages", (req, res) => {
	const { chatRoomId } = req.params;
	const { text, senderId } = req.body;

	if (!text || !senderId) {
		return res.status(400).json({ error: "Text and senderId are required" });
	}

	const newMessage = createMessage({
		chatRoomId: `${chatRoomId}`,
		text: `${text}`,
		senderId: `${senderId}`,
		timestamp: new Date(),
	});

	res.status(201).json(newMessage);
});

router.put("/:chatRoomId/messages/:messageId", (req, res) => {
	const { messageId } = req.params;
	const { text } = req.body;

	if (!text) {
		return res.status(400).json({ error: "Text is required" });
	}

	const updatedMessage = updateMessage(messageId, { text });

	if (!updatedMessage) {
		return res.status(404).json({ error: "Message not found" });
	}

	res.json(updatedMessage);
});

router.delete("/:chatRoomId/messages/:messageId", (req, res) => {
	const { messageId } = req.params;
	const deleted = deleteMessage(messageId);

	if (!deleted) {
		return res.status(404).json({ error: "Message not found" });
	}

	res.status(204).send();
});

export default router;
