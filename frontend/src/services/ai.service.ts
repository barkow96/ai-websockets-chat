import { assureAiMessageResponse } from "@/mappers";
import { AiMessageResponse, Message } from "@/types";
import { enhancedFetch } from "@/utils";

export const AiService = {
  generateResponse: async (
    previousMessages: Message[],
    senderId: string
  ): Promise<AiMessageResponse | undefined> => {
    const maybeAiMessageResponse = await enhancedFetch<AiMessageResponse>(
      `${process.env.NEXT_PUBLIC_API_URL}/ai/generate-response`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: previousMessages, senderId }),
      }
    );

    if (!maybeAiMessageResponse) return;
    return assureAiMessageResponse(maybeAiMessageResponse);
  },
} as const;
