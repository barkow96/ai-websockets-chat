import { ChatRoom } from "../types/chatRooms";
import { DatabaseService } from "./DatabaseService";

const chatRoomsService = new DatabaseService<ChatRoom>("chatRooms.json", "chatRooms");

export const getAllChatRooms = () => chatRoomsService.getAll();
export const getChatRoomById = (id: string) => chatRoomsService.getById(id);
export const createChatRoom = (chatRoom: Omit<ChatRoom, "id">) => chatRoomsService.create(chatRoom);
export const updateChatRoom = (id: string, updates: Partial<Omit<ChatRoom, "id">>) => chatRoomsService.update(id, updates);
export const deleteChatRoom = (id: string) => chatRoomsService.delete(id);
