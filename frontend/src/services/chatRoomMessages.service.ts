import { assureMessage, assureMessages } from "@/mappers";
import { Message } from "@/types";

export const ChatRoomMessagesService = {
  getChatRoomMessages: async (chatRoomId: string): Promise<Message[]> => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/chat-rooms/${chatRoomId}/messages`
    );
    const maybeMessages = await response.json();
    return assureMessages(maybeMessages);
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
    const maybeMessage = await response.json();
    return assureMessage(maybeMessage);
  },
} as const;
