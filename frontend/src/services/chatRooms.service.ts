import { ChatRoom } from "@/types";

export const ChatRoomsService = {
  getChatRooms: async (): Promise<ChatRoom[]> => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/chatRooms`
    );
    return response.json();
  },

  getChatRoom: async (id: string): Promise<ChatRoom | undefined> => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/chatRooms/${id}`
    );
    return response.json();
  },

  createChatRoom: async (chatRoom: Omit<ChatRoom, "id">): Promise<ChatRoom> => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/chatRooms`,
      {
        method: "POST",
        body: JSON.stringify(chatRoom),
      }
    );
    return response.json();
  },
} as const;
