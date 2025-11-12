import { assureChatRoom, assureChatRooms } from "@/mappers";
import { ChatRoom } from "@/types";
import { enhancedFetch } from "@/utils";

export const ChatRoomsService = {
  getChatRooms: async (): Promise<ChatRoom[]> => {
    const maybeChatRooms = await enhancedFetch<ChatRoom[]>(
      `${process.env.NEXT_PUBLIC_API_URL}/chat-rooms`
    );

    if (!maybeChatRooms) return [];
    return assureChatRooms(maybeChatRooms);
  },

  getChatRoom: async (id: string): Promise<ChatRoom | undefined> => {
    const maybeChatRoom = await enhancedFetch<ChatRoom>(
      `${process.env.NEXT_PUBLIC_API_URL}/chat-rooms/${id}`
    );

    if (!maybeChatRoom) return;
    return assureChatRoom(maybeChatRoom);
  },

  createChatRoom: async (
    chatRoom: Omit<ChatRoom, "id" | "users">
  ): Promise<ChatRoom | undefined> => {
    const maybeChatRoom = await enhancedFetch<ChatRoom>(
      `${process.env.NEXT_PUBLIC_API_URL}/chat-rooms`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(chatRoom),
      }
    );

    if (!maybeChatRoom) return;
    return assureChatRoom(maybeChatRoom);
  },
} as const;
