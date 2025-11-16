"use client";
import { ChatRoom, User } from "@/types";
import { Box, Text } from "@chakra-ui/react";

type Props = {
  selectedUser: User | null;
  selectedRoom: ChatRoom | null;
};

export const MessagesEmpty = ({ selectedUser, selectedRoom }: Props) => {
  const getInformationText = () => {
    if (!selectedUser && !selectedRoom) {
      return "Select a user and chat room to start the conversation";
    }
    if (!selectedUser) {
      return "Select a user to start the conversation";
    }
    return "Select a chat room to start the conversation";
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="100%"
    >
      <Text color="gray.400" fontSize="md" fontWeight="medium">
        {getInformationText()}
      </Text>
    </Box>
  );
};
