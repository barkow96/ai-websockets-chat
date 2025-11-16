"use client";
import { useChat } from "@/providers";
import { Box, Text, VStack } from "@chakra-ui/react";
import { MessageBubble } from "./MessageBubble";

export const MessagesList = () => {
  const { messages, selectedUser } = useChat();

  if (messages.length === 0) {
    return (
      <Box textAlign="center" py={8}>
        <Text color="gray.500" fontSize="sm">
          No messages. Start the conversation!
        </Text>
      </Box>
    );
  }

  return (
    <VStack gap={3} align="stretch">
      {messages.map(message => {
        return (
          <MessageBubble
            key={message.id}
            message={message}
            isCurrentUser={message.senderId === selectedUser?.id}
          />
        );
      })}
    </VStack>
  );
};
