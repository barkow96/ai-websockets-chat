import express from "express";
import { dbChatRooms } from "../database";

const router = express.Router();

router.get("/", (req, res) => {
	res.json(dbChatRooms);
});

router.get("/:id", (req, res) => {
	const room = dbChatRooms.find((r) => r.id === req.params.id);

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

	const newRoom = {
		id: (dbChatRooms.length + 1).toString(),
		name: `${name}`,
		description: `${description}`,
	};

	dbChatRooms.push(newRoom);
	res.status(201).json(newRoom);
});

export default router;
