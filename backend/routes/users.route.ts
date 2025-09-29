import express from "express";
import { dbUsers } from "../database";

const router = express.Router();

router.get("/", (req, res) => {
	res.json(dbUsers);
});

router.get("/:id", (req, res) => {
	const user = dbUsers.find((u) => u.id === req.params.id);
	if (!user) {
		return res.status(404).json({ error: "User not found" });
	}
	res.json(user);
});

router.post("/", (req, res) => {
	const { name, avatar } = req.body;

	if (!name) {
		return res.status(400).json({ error: "Name is required" });
	}

	const newUser = {
		id: (dbUsers.length + 1).toString(),
		name: `${name}`,
		avatar: `${avatar}`,
	};

	dbUsers.push(newUser);
	res.status(201).json(newUser);
});

router.put("/:id", (req, res) => {
	const { id } = req.params;
	const { name, avatar } = req.body;

	const userIndex = dbUsers.findIndex((u) => u.id === id);

	if (userIndex === -1) {
		return res.status(404).json({ error: "User not found" });
	}

	if (name) dbUsers[userIndex].name = name;
	if (avatar) dbUsers[userIndex].avatar = avatar;

	res.json(dbUsers[userIndex]);
});

export default router;
