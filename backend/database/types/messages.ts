export type MessageEntity = {
	id: string;
	chatRoomId: string;
	text: string;
	senderId: string;
	timestamp: Date;
};

export type MessageDto = MessageEntity & { senderName: string };
