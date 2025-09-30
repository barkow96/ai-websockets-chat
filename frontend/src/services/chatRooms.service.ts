import { ChatRoom } from "@/types";

export const ChatRoomsService = {
  getChatRooms: async (): Promise<ChatRoom[]> => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/chat-rooms`
    );
    return response.json();
  },

  getChatRoom: async (id: string): Promise<ChatRoom | undefined> => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/chat-rooms/${id}`
    );
    return response.json();
  },

  createChatRoom: async (chatRoom: Omit<ChatRoom, "id">): Promise<ChatRoom> => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/chat-rooms`,
      {
        method: "POST",
        body: JSON.stringify(chatRoom),
      }
    );
    return response.json();
  },
} as const;
