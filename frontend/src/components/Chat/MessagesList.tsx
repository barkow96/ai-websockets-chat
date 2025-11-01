"use client";
import { Message, User } from "@/types";
import { Box, Text, VStack } from "@chakra-ui/react";
import { MessageBubble } from "./MessageBubble";

type Props = {
  messages: Message[];
  selectedUser: User;
};

export const MessagesList = ({ messages, selectedUser }: Props) => {
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
        const isCurrentUser = message.senderId === selectedUser.id;
        return (
          <MessageBubble
            key={message.id}
            message={message}
            isCurrentUser={isCurrentUser}
          />
        );
      })}
    </VStack>
  );
};

