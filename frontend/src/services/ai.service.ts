import { Message } from "@/types";

export const AiService = {
  generateResponse: async (messages: Message[], senderId: string) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/ai/generate-response`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages, senderId }),
      }
    );
    return response.json();
  },
} as const;
