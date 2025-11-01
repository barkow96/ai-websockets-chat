"use client";
import { useSocketIo } from "@/providers";
import {
  ChatMessageReceiveEventsData,
  ChatRoom,
  Message,
  OChatEvent,
  User,
} from "@/types";
import {
  Box,
  Button,
  Flex,
  HStack,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";

type Props = {
  selectedRoomMessages: Message[];
  selectedUser: User | null;
  selectedRoom: ChatRoom | null;
};

export const Chat = ({
  selectedRoomMessages,
  selectedUser,
  selectedRoom,
}: Props) => {
  const [messageText, setMessageText] = useState("");
  const [messages, setMessages] = useState<Message[]>(selectedRoomMessages);

  const { socket } = useSocketIo();

  const handleSendMessage = () => {
    if (
      messageText.trim().length === 0 ||
      !selectedRoom ||
      selectedRoom?.id.length === 0
    ) {
      return;
    }

    socket?.emit(OChatEvent.MessageNew, {
      chatRoomId: selectedRoom.id,
      message: messageText.trim(),
      senderId: selectedUser?.id || "",
      timestamp: new Date(),
    });
    setMessageText("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleNewMessage = useCallback(
    (data: ChatMessageReceiveEventsData) => {
      if (data.chatRoomId !== selectedRoom?.id) return;

      const newMessage: Message = {
        id: data.id,
        chatRoomId: data.chatRoomId,
        text: data.text,
        senderId: data.senderId,
        senderName: data.senderName,
        timestamp: data.timestamp,
      };

      setMessages(prev => [...prev, newMessage]);
    },
    [selectedRoom]
  );

  useEffect(() => {
    setMessages(selectedRoomMessages);
  }, [selectedRoomMessages]);

  useEffect(() => {
    if (!selectedRoom) setMessages([]);
  }, [selectedRoom]);

  useEffect(() => {
    if (!socket) return;

    socket.on(OChatEvent.MessageNew, (data: ChatMessageReceiveEventsData) =>
      handleNewMessage(data)
    );

    return () => {
      socket.off(OChatEvent.MessageNew);
    };
  }, [socket, handleNewMessage]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      height="calc(100vh - 200px)"
      minH="400px"
      border="3px solid"
      borderColor="gray.400"
      borderRadius="lg"
      overflow="hidden"
      bg="gray.50"
      boxShadow="lg"
    >
      <Box
        flex="1"
        overflowY="auto"
        p={4}
        bg="white"
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
        {selectedRoom ? (
          <VStack gap={3} align="stretch">
            {messages.length === 0 ? (
              <Box textAlign="center" py={8}>
                <Text color="gray.500" fontSize="sm">
                  Brak wiadomości. Rozpocznij rozmowę!
                </Text>
              </Box>
            ) : (
              messages.map(message => {
                const isCurrentUser = message.senderId === selectedUser?.id;
                return (
                  <Flex
                    key={message.id}
                    justify={isCurrentUser ? "flex-end" : "flex-start"}
                  >
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
                        <Text
                          fontSize="xs"
                          fontWeight="bold"
                          mb={1}
                          color="gray.700"
                        >
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
                        {new Date(message.timestamp)
                          .toISOString()
                          .slice(11, 16)}
                      </Text>
                    </Box>
                  </Flex>
                );
              })
            )}
          </VStack>
        ) : (
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            height="100%"
          >
            <Text color="gray.400" fontSize="md" fontWeight="medium">
              Wybierz pokój czatu, aby rozpocząć rozmowę
            </Text>
          </Box>
        )}
      </Box>

      {selectedRoom && (
        <Box p={4} borderTop="2px solid" borderColor="gray.300" bg="white">
          <HStack gap={2}>
            <Input
              value={messageText}
              onChange={e => setMessageText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Napisz wiadomość..."
              flex="1"
              border="2px solid"
              borderColor="gray.300"
              _focus={{
                borderColor: "blue.500",
                boxShadow: "0 0 0 1px var(--chakra-colors-blue-500)",
              }}
            />
            <Button
              onClick={handleSendMessage}
              colorScheme="blue"
              disabled={!messageText.trim()}
              px={6}
              fontWeight="semibold"
            >
              Wyślij
            </Button>
          </HStack>
        </Box>
      )}
    </Box>
  );
};
