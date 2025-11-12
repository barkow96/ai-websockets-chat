"use client";
import { gradientAi } from "@/styles";
import { Box, Button, HStack, Input } from "@chakra-ui/react";

type Props = {
  messageText: string;
  onMessageTextChange: (value: string) => void;
  onSend: () => void;
  isAiEnabled: boolean;
  onGenerateResponse: () => void;
};

export const MessageControls = ({
  messageText,
  onMessageTextChange,
  onSend,
  isAiEnabled,
  onGenerateResponse,
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
          disabled={!messageText.trim()}
          fontWeight="semibold"
          paddingX={6}
        >
          Send
        </Button>

        {isAiEnabled && (
          <Button
            onClick={onGenerateResponse}
            fontWeight="semibold"
            paddingX={6}
            style={{ background: gradientAi }}
            color="white"
            _hover={{
              opacity: 0.9,
            }}
          >
            Generate Response
          </Button>
        )}
      </HStack>
    </Box>
  );
};
