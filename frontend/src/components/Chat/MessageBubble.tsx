"use client";
import { Message } from "@/types";
import { Box, Flex, Text } from "@chakra-ui/react";

type Props = {
  message: Message;
  isCurrentUser: boolean;
};

export const MessageBubble = ({ message, isCurrentUser }: Props) => {
  return (
    <Flex justify={isCurrentUser ? "flex-end" : "flex-start"}>
      <Box
        bg={isCurrentUser ? "blue.500" : "gray.200"}
        color={isCurrentUser ? "white" : "black"}
        px={4}
        py={3}
        borderRadius="lg"
        maxWidth="70%"
        boxShadow="sm"
        border={isCurrentUser ? "none" : "1px solid"}
        borderColor={isCurrentUser ? "transparent" : "gray.300"}
      >
        {!isCurrentUser && (
          <Text fontSize="xs" fontWeight="bold" mb={1} color="gray.700">
            {message.senderName}
          </Text>
        )}
        <Text fontSize="sm" wordBreak="break-word">
          {message.text}
        </Text>
        <Text
          fontSize="xs"
          opacity={0.8}
          mt={1}
          textAlign={isCurrentUser ? "right" : "left"}
        >
          {new Date(message.timestamp).toISOString().slice(11, 16)}
        </Text>
      </Box>
    </Flex>
  );
};
