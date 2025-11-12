import { assureMessage, assureMessages } from "@/mappers";
import { Message } from "@/types";
import { enhancedFetch } from "@/utils";

export const ChatRoomMessagesService = {
  getChatRoomMessages: async (chatRoomId: string): Promise<Message[]> => {
    const maybeMessages = await enhancedFetch<unknown>(
      `${process.env.NEXT_PUBLIC_API_URL}/chat-rooms/${chatRoomId}/messages`
    );

    if (!maybeMessages) return [];
    return assureMessages(maybeMessages);
  },

  createChatRoomMessage: async (
    chatRoomId: string,
    message: Message
  ): Promise<Message | undefined> => {
    const maybeMessage = await enhancedFetch<unknown>(
      `${process.env.NEXT_PUBLIC_API_URL}/chat-rooms/${chatRoomId}/messages`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(message),
      }
    );

    if (!maybeMessage) return;
    return assureMessage(maybeMessage);
  },
} as const;
