import { assureChatRoom, assureChatRooms } from "@/mappers";
import { ChatRoom } from "@/types";

export const ChatRoomsService = {
  getChatRooms: async (): Promise<ChatRoom[]> => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/chat-rooms`
    );

    const maybeChatRooms = await response.json();
    return assureChatRooms(maybeChatRooms);
  },

  getChatRoom: async (id: string): Promise<ChatRoom | undefined> => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/chat-rooms/${id}`
    );

    const maybeChatRoom = await response.json();
    return assureChatRoom(maybeChatRoom);
  },

  createChatRoom: async (
    chatRoom: Omit<ChatRoom, "id" | "users">
  ): Promise<ChatRoom> => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/chat-rooms`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(chatRoom),
      }
    );

    const maybeChatRoom = await response.json();
    return assureChatRoom(maybeChatRoom);
  },
} as const;
