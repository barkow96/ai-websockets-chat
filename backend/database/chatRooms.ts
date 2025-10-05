import { readFileSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

type ChatRoom = {
	id: string;
	name: string;
	description: string;
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const DATA_DIR = join(__dirname, "data");
const CHAT_ROOMS_FILE = join(DATA_DIR, "chatRooms.json");

const readChatRoomsFromFile = (): ChatRoom[] => {
	try {
		const data = readFileSync(CHAT_ROOMS_FILE, "utf8");
		return JSON.parse(data);
	} catch (error) {
		console.error("Error reading chat rooms file:", error);
		return [];
	}
};

const writeChatRoomsToFile = (chatRooms: ChatRoom[]): void => {
	try {
		writeFileSync(CHAT_ROOMS_FILE, JSON.stringify(chatRooms, null, 2));
	} catch (error) {
		console.error("Error writing chat rooms file:", error);
	}
};

export const getAllChatRooms = (): ChatRoom[] => {
	return readChatRoomsFromFile();
};

export const getChatRoomById = (id: string): ChatRoom | undefined => {
	const chatRooms = readChatRoomsFromFile();
	return chatRooms.find((room) => room.id === id);
};

export const createChatRoom = (chatRoom: Omit<ChatRoom, "id">): ChatRoom => {
	const chatRooms = readChatRoomsFromFile();
	const newChatRoom: ChatRoom = {
		...chatRoom,
		id: Date.now().toString(),
	};
	chatRooms.push(newChatRoom);
	writeChatRoomsToFile(chatRooms);
	return newChatRoom;
};

export const updateChatRoom = (id: string, updates: Partial<Omit<ChatRoom, "id">>): ChatRoom | null => {
	const chatRooms = readChatRoomsFromFile();
	const roomIndex = chatRooms.findIndex((room) => room.id === id);

	if (roomIndex === -1) {
		return null;
	}

	chatRooms[roomIndex] = { ...chatRooms[roomIndex], ...updates };
	writeChatRoomsToFile(chatRooms);
	return chatRooms[roomIndex];
};

export const deleteChatRoom = (id: string): boolean => {
	const chatRooms = readChatRoomsFromFile();
	const roomIndex = chatRooms.findIndex((room) => room.id === id);

	if (roomIndex === -1) {
		return false;
	}

	chatRooms.splice(roomIndex, 1);
	writeChatRoomsToFile(chatRooms);
	return true;
};
