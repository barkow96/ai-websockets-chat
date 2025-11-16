import express from "express";
import OpenAI from "openai";
import { MessageDto } from "../database/types/messages";

const router = express.Router();

const openai = new OpenAI({
	baseURL: "https://openrouter.ai/api/v1",
	apiKey: process.env.OPEN_ROUTER_AI_LLM_API_KEY,
});

router.post("/generate-response", async (req, res) => {
	const messages: MessageDto[] = req.body.messages;
	const senderId: string = req.body.senderId;

	const completion = await openai.chat.completions.create({
		model: "tngtech/deepseek-r1t2-chimera:free",
		messages: messages.map((message) => ({
			role: "user",
			content: `${senderId === message.senderId ? "You" : message.senderName} (${message.timestamp}): ${message.text}`,
		})),
	});

	res.status(201).json({ message: completion?.choices?.[0]?.message?.content ?? "" });
});

export default router;
