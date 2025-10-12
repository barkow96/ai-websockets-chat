import { Message } from "@/types";

export const ChatRoomMessagesService = {
  getChatRoomMessages: async (chatRoomId: string): Promise<Message[]> => {
    console.log(
      "GET messages - url:",
      `${process.env.NEXT_PUBLIC_API_URL}/chat-rooms/${chatRoomId}/messages`
    );
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/chat-rooms/${chatRoomId}/messages`
    );
    return response.json();
  },

  createChatRoomMessage: async (
    chatRoomId: string,
    message: Message
  ): Promise<Message> => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/chat-rooms/${chatRoomId}/messages`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(message),
      }
    );
    return response.json();
  },
} as const;
