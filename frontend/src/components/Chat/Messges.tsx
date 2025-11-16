"use client";
import { useChat } from "@/providers";
import { Box } from "@chakra-ui/react";
import { MessagesEmpty } from "./MessagesEmpty";
import { MessagesList } from "./MessagesList";

export const Messages = () => {
  const { showMessages } = useChat();

  return (
    <Box
      flex="1"
      padding={4}
      background="white"
      overflowY="auto"
      css={{
        "&::-webkit-scrollbar": {
          width: "8px",
        },
        "&::-webkit-scrollbar-track": {
          background: "#f1f1f1",
        },
        "&::-webkit-scrollbar-thumb": {
          background: "#888",
          borderRadius: "4px",
        },
        "&::-webkit-scrollbar-thumb:hover": {
          background: "#555",
        },
      }}
    >
      {showMessages ? <MessagesList /> : <MessagesEmpty />}
    </Box>
  );
};
