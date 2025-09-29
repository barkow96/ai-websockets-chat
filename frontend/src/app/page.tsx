"use client";
import { Chat } from "@/components";
import { Message } from "@/types";
import { Box } from "@chakra-ui/react";
import { useState } from "react";

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Cześć! Jak się masz?",
      senderId: "user2",
      timestamp: new Date(Date.now() - 60000),
    },
    {
      id: "2",
      text: "Dobrze, dzięki! A Ty?",
      senderId: "user1",
      timestamp: new Date(Date.now() - 30000),
    },
    {
      id: "3",
      text: "Też dobrze, dzięki za pytanie!",
      senderId: "user2",
      timestamp: new Date(),
    },
  ]);

  const currentUserId = "user1";

  const handleSendMessage = (text: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      senderId: currentUserId,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, newMessage]);
  };

  return (
    <Box width="100%" maxWidth="1200px" margin="0 auto">
      <Chat
        messages={messages}
        currentUserId={currentUserId}
        onSendMessage={handleSendMessage}
      />
    </Box>
  );
}
