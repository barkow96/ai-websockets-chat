type Message = {
	id: string;
	chatRoomId: string;
	text: string;
	senderId: string;
	timestamp: Date;
};

export const dbMessages: Message[] = [];
