"use client";
import { useChat } from "@/providers";
import { Stack, Text } from "@chakra-ui/react";

export const MessagesEmpty = () => {
  const { selectedUser, selectedRoom } = useChat();

  const getEmptyMessagesText = () => {
    if (!selectedUser && !selectedRoom) {
      return "Select a user and chat room to start the conversation";
    }

    if (!selectedUser) {
      return "Select a user to start the conversation";
    }

    return "Select a chat room to start the conversation";
  };

  return (
    <Stack alignItems="center" justifyContent="center" height="100%">
      <Text color="gray.400" fontSize="md" fontWeight="medium">
        {getEmptyMessagesText()}
      </Text>
    </Stack>
  );
};
