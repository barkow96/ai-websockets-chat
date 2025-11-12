"use client";
import { gradientAi } from "@/styles";
import {
  Box,
  Button,
  HStack,
  Input,
  Spinner,
  Stack,
  chakra,
} from "@chakra-ui/react";

type Props = {
  messageText: string;
  onMessageTextChange: (value: string) => void;
  onSend: () => void;
  isAiEnabled: boolean;
  onGenerateAiResponse: () => void;
  isGeneratingAiResponse: boolean;
};

export const MessageControls = ({
  messageText,
  onMessageTextChange,
  onSend,
  isAiEnabled,
  onGenerateAiResponse,
  isGeneratingAiResponse,
}: Props) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <Box p={4} borderTop="2px solid" borderColor="gray.300" bg="white">
      <Stack direction={{ base: "column", md: "row" }} gap={2}>
        <Input
          value={messageText}
          onChange={e => onMessageTextChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
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
          <>
            <Button
              onClick={onGenerateAiResponse}
              disabled={isGeneratingAiResponse}
              fontWeight="semibold"
              paddingX={6}
              style={{ background: gradientAi }}
              color="white"
              _hover={{
                opacity: 0.9,
              }}
            >
              {isGeneratingAiResponse ? (
                <HStack gap={2}>
                  <Spinner size="sm" /> Generating...
                </HStack>
              ) : (
                <chakra.span> Generate Response</chakra.span>
              )}
            </Button>

            {/* TODO: Implement full AI mode (automatic response generation for all messages) */}
            <Button
              fontWeight="semibold"
              paddingX={6}
              style={{ background: gradientAi }}
              color="white"
              _hover={{
                opacity: 0.9,
              }}
            >
              Enable Full AI Mode
            </Button>
          </>
        )}
      </Stack>
    </Box>
  );
};
