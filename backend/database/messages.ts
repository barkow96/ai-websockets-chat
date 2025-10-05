import { readFileSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

type Message = {
	id: string;
	chatRoomId: string;
	text: string;
	senderId: string;
	timestamp: Date;
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const DATA_DIR = join(__dirname, "data");
const MESSAGES_FILE = join(DATA_DIR, "messages.json");

const readMessagesFromFile = (): Message[] => {
	try {
		const data = readFileSync(MESSAGES_FILE, "utf8");
		return JSON.parse(data);
	} catch (error) {
		console.error("Error reading messages file:", error);
		return [];
	}
};

const writeMessagesToFile = (messages: Message[]): void => {
	try {
		writeFileSync(MESSAGES_FILE, JSON.stringify(messages, null, 2));
	} catch (error) {
		console.error("Error writing messages file:", error);
	}
};

export const getAllMessages = (): Message[] => {
	return readMessagesFromFile();
};

export const getMessagesByChatRoomId = (chatRoomId: string): Message[] => {
	const messages = readMessagesFromFile();
	return messages.filter((message) => message.chatRoomId === chatRoomId);
};

export const getMessageById = (id: string): Message | undefined => {
	const messages = readMessagesFromFile();
	return messages.find((message) => message.id === id);
};

export const createMessage = (message: Omit<Message, "id" | "timestamp">): Message => {
	const messages = readMessagesFromFile();
	const newMessage: Message = {
		...message,
		id: Date.now().toString(),
		timestamp: new Date(),
	};
	messages.push(newMessage);
	writeMessagesToFile(messages);
	return newMessage;
};

export const updateMessage = (id: string, updates: Partial<Omit<Message, "id" | "timestamp">>): Message | null => {
	const messages = readMessagesFromFile();
	const messageIndex = messages.findIndex((message) => message.id === id);

	if (messageIndex === -1) {
		return null;
	}

	messages[messageIndex] = { ...messages[messageIndex], ...updates };
	writeMessagesToFile(messages);
	return messages[messageIndex];
};

export const deleteMessage = (id: string): boolean => {
	const messages = readMessagesFromFile();
	const messageIndex = messages.findIndex((message) => message.id === id);

	if (messageIndex === -1) {
		return false;
	}

	messages.splice(messageIndex, 1);
	writeMessagesToFile(messages);
	return true;
};

export const deleteMessagesByChatRoomId = (chatRoomId: string): number => {
	const messages = readMessagesFromFile();
	const initialLength = messages.length;
	const filteredMessages = messages.filter((message) => message.chatRoomId !== chatRoomId);
	const deletedCount = initialLength - filteredMessages.length;
	writeMessagesToFile(filteredMessages);
	return deletedCount;
};
