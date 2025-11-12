import { Message } from "@/types";
import { enhancedFetch } from "@/utils";

export const AiService = {
  generateResponse: async (messages: Message[], senderId: string) => {
    return enhancedFetch<unknown>(
      `${process.env.NEXT_PUBLIC_API_URL}/ai/generate-response`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages, senderId }),
      }
    );
  },
} as const;
