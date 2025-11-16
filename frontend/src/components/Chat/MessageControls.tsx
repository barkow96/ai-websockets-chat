"use client";
import { useChat } from "@/providers";
import { gradientAi } from "@/styles";
import {
  Box,
  Button,
  ButtonProps,
  HStack,
  Input,
  Spinner,
  Stack,
  chakra,
} from "@chakra-ui/react";

const aiButtonProps: ButtonProps = {
  style: { background: gradientAi },
  fontWeight: "semibold",
  paddingX: 6,
  color: "white" as const,
  _hover: {
    opacity: 0.9,
  },
} as const;

export const MessageControls = () => {
  const {
    messageText,
    setMessageText,
    sendMessage,
    isAiEnabled,
    generateAiResponse,
    isGeneratingAiResponse,
    toggleFullAiMode,
    isFullAiModeEnabled,
    showMessages,
  } = useChat();

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleGenerateAiResponse = async () => {
    const response = await generateAiResponse();
    if (response) setMessageText(response);
  };

  if (!showMessages) return null;

  return (
    <Box p={4} borderTop="2px solid" borderColor="gray.300" bg="white">
      <Stack direction={{ base: "column", md: "row" }} gap={2}>
        <Input
          value={messageText}
          onChange={e => setMessageText(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isGeneratingAiResponse}
          placeholder="Type a message..."
          border="2px solid"
          borderColor="gray.300"
          _focus={{
            borderColor: "blue.500",
            boxShadow: "0 0 0 1px var(--chakra-colors-blue-500)",
          }}
        />

        <Button
          onClick={() => sendMessage()}
          disabled={!messageText.trim()}
          fontWeight="semibold"
          paddingX={6}
        >
          Send
        </Button>

        {isAiEnabled && (
          <>
            <Button
              onClick={handleGenerateAiResponse}
              disabled={isGeneratingAiResponse}
              {...aiButtonProps}
            >
              {isGeneratingAiResponse ? (
                <HStack gap={2}>
                  <Spinner size="sm" /> Generating...
                </HStack>
              ) : (
                <chakra.span> Generate Response</chakra.span>
              )}
            </Button>

            <Button onClick={toggleFullAiMode} {...aiButtonProps}>
              {isFullAiModeEnabled
                ? "Full AI Mode Enabled"
                : "Full AI Mode Disabled"}
            </Button>
          </>
        )}
      </Stack>
    </Box>
  );
};
