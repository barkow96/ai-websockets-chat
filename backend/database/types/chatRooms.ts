import { UserDto } from "./users";

export type ChatRoomEntity = {
	id: string;
	name: string;
	description: string;
	userIds: string[];
};

export type ChatRoomDto = Omit<ChatRoomEntity, "userIds"> & {
	users: UserDto[];
};
