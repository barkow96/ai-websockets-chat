import express from "express";
import { getAllUsers, getUserById, createUser, updateUser, deleteUser } from "../database";

const router = express.Router();

router.get("/", (req, res) => {
	res.json(getAllUsers());
});

router.get("/:id", (req, res) => {
	const user = getUserById(req.params.id);
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

	const newUser = createUser({
		name: `${name}`,
		avatar: `${avatar}`,
	});

	res.status(201).json(newUser);
});

router.put("/:id", (req, res) => {
	const { id } = req.params;
	const { name, avatar } = req.body;

	const updatedUser = updateUser(id, { name, avatar });

	if (!updatedUser) {
		return res.status(404).json({ error: "User not found" });
	}

	res.json(updatedUser);
});

router.delete("/:id", (req, res) => {
	const { id } = req.params;
	const deleted = deleteUser(id);

	if (!deleted) {
		return res.status(404).json({ error: "User not found" });
	}

	res.status(204).send();
});

export default router;
