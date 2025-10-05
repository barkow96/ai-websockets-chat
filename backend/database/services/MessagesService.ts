import { MessageDto, MessageEntity } from "../types/messages";
import { DatabaseService } from "./DatabaseService";
import { getUserById } from "./UsersService";

const messagesService = new DatabaseService<MessageEntity>("messages.json", "messages");

const enrichMessageWithSender = (message: MessageEntity): MessageDto => {
	const sender = getUserById(message.senderId);
	return {
		...message,
		senderName: sender?.name || "Unknown User",
	};
};

const enrichMessagesWithSenders = (messages: MessageEntity[]): MessageDto[] => {
	return messages.map(enrichMessageWithSender);
};

export const getAllMessages = (): MessageDto[] => {
	const messages = messagesService.getAll();
	return enrichMessagesWithSenders(messages);
};

export const getMessageById = (id: string): MessageDto | undefined => {
	const message = messagesService.getById(id);
	return message ? enrichMessageWithSender(message) : undefined;
};

export const getMessagesByChatRoomId = (chatRoomId: string): MessageDto[] => {
	const messages = messagesService.findBy("chatRoomId", chatRoomId);
	return enrichMessagesWithSenders(messages);
};

export const createMessage = (message: Omit<MessageEntity, "id">): MessageDto => {
	const newMessage = messagesService.create(message);
	return enrichMessageWithSender(newMessage);
};

export const updateMessage = (id: string, updates: Partial<Omit<MessageEntity, "id" | "timestamp">>): MessageDto | null => {
	const updatedMessage = messagesService.update(id, updates);
	return updatedMessage ? enrichMessageWithSender(updatedMessage) : null;
};

export const deleteMessage = (id: string): boolean => {
	return messagesService.delete(id);
};

export const deleteMessagesByChatRoomId = (chatRoomId: string): number => {
	return messagesService.deleteBy("chatRoomId", chatRoomId);
};
