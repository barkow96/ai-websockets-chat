import { ChatRoomDto, ChatRoomEntity } from "../types/chatRooms";
import { DatabaseService } from "./DatabaseService";
import { getUserById } from "./UsersService";

const chatRoomsService = new DatabaseService<ChatRoomEntity>("chatRooms.json", "chatRooms");

const enrichChatRoomWithUsers = (chatRoom: ChatRoomEntity): ChatRoomDto => {
	const users = chatRoom.userIds
		.map((userId) => getUserById(userId))
		.filter((user) => user !== undefined)
		.map((user) => ({
			id: user.id,
			name: user.name,
			avatar: user.avatar,
		}));

	return {
		id: chatRoom.id,
		name: chatRoom.name,
		description: chatRoom.description,
		users,
	};
};

const enrichChatRoomsWithUsers = (chatRooms: ChatRoomEntity[]): ChatRoomDto[] => {
	return chatRooms.map(enrichChatRoomWithUsers);
};

export const getAllChatRooms = (): ChatRoomDto[] => {
	const chatRooms = chatRoomsService.getAll();
	return enrichChatRoomsWithUsers(chatRooms);
};

export const getChatRoomById = (id: string): ChatRoomDto | undefined => {
	const chatRoom = chatRoomsService.getById(id);
	return chatRoom ? enrichChatRoomWithUsers(chatRoom) : undefined;
};

export const createChatRoom = (chatRoom: Omit<ChatRoomEntity, "id">): ChatRoomDto => {
	const newChatRoom = chatRoomsService.create(chatRoom);
	return enrichChatRoomWithUsers(newChatRoom);
};

export const updateChatRoom = (id: string, updates: Partial<Omit<ChatRoomEntity, "id">>): ChatRoomDto | null => {
	const updatedChatRoom = chatRoomsService.update(id, updates);
	return updatedChatRoom ? enrichChatRoomWithUsers(updatedChatRoom) : null;
};

export const deleteChatRoom = (id: string): boolean => {
	return chatRoomsService.delete(id);
};
