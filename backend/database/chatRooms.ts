type ChatRoom = {
	id: string;
	name: string;
	description: string;
};

export const dbChatRooms: ChatRoom[] = [
	{ id: "1", name: "General", description: "General discussion" },
	{ id: "2", name: "Tech Talk", description: "Technology discussions" },
	{ id: "3", name: "Random", description: "Random chat" },
];
