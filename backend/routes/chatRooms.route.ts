import express from "express";
import { getAllChatRooms, getChatRoomById, createChatRoom, updateChatRoom, deleteChatRoom } from "../database";

const router = express.Router();

router.get("/", (req, res) => {
	res.json(getAllChatRooms());
});

router.get("/:id", (req, res) => {
	const room = getChatRoomById(req.params.id);

	if (!room) {
		return res.status(404).json({ error: "Chat room not found" });
	}

	res.json(room);
});

router.post("/", (req, res) => {
	const { name, description } = req.body;

	if (!name) {
		return res.status(400).json({ error: "Name is required" });
	}

	const newRoom = createChatRoom({
		name: `${name}`,
		description: `${description}`,
	});

	res.status(201).json(newRoom);
});

router.put("/:id", (req, res) => {
	const { id } = req.params;
	const { name, description } = req.body;

	const updatedRoom = updateChatRoom(id, { name, description });

	if (!updatedRoom) {
		return res.status(404).json({ error: "Chat room not found" });
	}

	res.json(updatedRoom);
});

router.delete("/:id", (req, res) => {
	const { id } = req.params;
	const deleted = deleteChatRoom(id);

	if (!deleted) {
		return res.status(404).json({ error: "Chat room not found" });
	}

	res.status(204).send();
});

export default router;
