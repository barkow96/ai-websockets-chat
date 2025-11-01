"use client";
import { Box, Button, HStack, Input } from "@chakra-ui/react";

type Props = {
  messageText: string;
  onMessageTextChange: (value: string) => void;
  onSend: () => void;
};

export const MessageInput = ({
  messageText,
  onMessageTextChange,
  onSend,
}: Props) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <Box p={4} borderTop="2px solid" borderColor="gray.300" bg="white">
      <HStack gap={2}>
        <Input
          value={messageText}
          onChange={e => onMessageTextChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          flex="1"
          border="2px solid"
          borderColor="gray.300"
          _focus={{
            borderColor: "blue.500",
            boxShadow: "0 0 0 1px var(--chakra-colors-blue-500)",
          }}
        />
        <Button
          onClick={onSend}
          colorScheme="blue"
          disabled={!messageText.trim()}
          px={6}
          fontWeight="semibold"
        >
          Send
        </Button>
      </HStack>
    </Box>
  );
};
