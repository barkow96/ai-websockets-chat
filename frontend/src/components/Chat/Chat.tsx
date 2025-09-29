"use client";
import { UsersService } from "@/services";
import { Message } from "@/types";
import {
  Box,
  Button,
  Flex,
  HStack,
  Input,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

type Props = {
  messages: Message[];
  currentUserId: string;
  onSendMessage: (text: string) => void;
};

export const Chat = ({ messages, currentUserId, onSendMessage }: Props) => {
  const [messageText, setMessageText] = useState("");

  const handleSendMessage = () => {
    if (messageText.trim()) {
      onSendMessage(messageText.trim());
      setMessageText("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await UsersService.getUsers();
      console.log(users);
    };

    fetchUsers();
  }, []);

  return (
    <Stack>
      <Box flex="1" overflowY="auto" p={4}>
        <VStack spacing={3} align="stretch">
          {messages.map(message => {
            const isCurrentUser = message.senderId === currentUserId;
            return (
              <Flex
                key={message.id}
                justify={isCurrentUser ? "flex-end" : "flex-start"}
              >
                <Box
                  bg={isCurrentUser ? "blue.500" : "gray.200"}
                  color={isCurrentUser ? "white" : "black"}
                  px={4}
                  py={2}
                  borderRadius="lg"
                  maxWidth="70%"
                >
                  <Text fontSize="sm">{message.text}</Text>
                  <Text
                    fontSize="xs"
                    opacity={0.7}
                    mt={1}
                    textAlign={isCurrentUser ? "right" : "left"}
                  >
                    {new Date(message.timestamp).toISOString().slice(11, 16)}
                  </Text>
                </Box>
              </Flex>
            );
          })}
        </VStack>
      </Box>

      <Box p={4} borderTop="1px" borderColor="gray.200">
        <HStack spacing={2}>
          <Input
            value={messageText}
            onChange={e => setMessageText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Napisz wiadomość..."
            flex="1"
          />
          <Button
            onClick={handleSendMessage}
            colorScheme="blue"
            isDisabled={!messageText.trim()}
          >
            Wyślij
          </Button>
        </HStack>
      </Box>
    </Stack>
  );
};
