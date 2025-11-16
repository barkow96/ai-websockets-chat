"use client";
import { ChatProvider } from "@/providers";
import { ChatRoom, Message, User } from "@/types";
import { Stack } from "@chakra-ui/react";
import { MessageControls } from "./MessageControls";
import { Messages } from "./Messages";

type Props = {
  selectedRoomInitialMessages: Message[];
  selectedUser: User | null;
  selectedRoom: ChatRoom | null;
  isAiEnabled: boolean;
};

export const Chat = ({
  selectedRoomInitialMessages,
  selectedUser,
  selectedRoom,
  isAiEnabled,
}: Props) => {
  return (
    <ChatProvider
      selectedRoomInitialMessages={selectedRoomInitialMessages}
      selectedUser={selectedUser}
      selectedRoom={selectedRoom}
      isAiEnabled={isAiEnabled}
    >
      <Stack
        height="calc(100vh - 200px)"
        minH="400px"
        border="3px solid"
        borderColor="gray.400"
        borderRadius="lg"
        background="gray.50"
        boxShadow="lg"
        overflow="hidden"
      >
        <Messages />

        <MessageControls />
      </Stack>
    </ChatProvider>
  );
};
