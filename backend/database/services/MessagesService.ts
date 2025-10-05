import { Message } from "../types/messages";
import { DatabaseService } from "./DatabaseService";

const messagesService = new DatabaseService<Message>("messages.json", "messages");

export const getAllMessages = () => messagesService.getAll();
export const getMessageById = (id: string) => messagesService.getById(id);
export const getMessagesByChatRoomId = (chatRoomId: string) => messagesService.findBy("chatRoomId", chatRoomId);
export const createMessage = (message: Omit<Message, "id">) => messagesService.create(message);
export const updateMessage = (id: string, updates: Partial<Omit<Message, "id" | "timestamp">>) => messagesService.update(id, updates);
export const deleteMessage = (id: string) => messagesService.delete(id);
export const deleteMessagesByChatRoomId = (chatRoomId: string) => messagesService.deleteBy("chatRoomId", chatRoomId);
