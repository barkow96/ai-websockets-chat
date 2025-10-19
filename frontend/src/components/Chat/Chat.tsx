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
  Stack,
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
    if (!socket) return;

    socket.on(OChatEvent.MessageNew, (data: ChatMessageReceiveEventsData) =>
      handleNewMessage(data)
    );

    return () => {
      socket.off(OChatEvent.MessageNew);
    };
  }, [socket, handleNewMessage]);

  return (
    <Stack>
      <Box flex="1" overflowY="auto" p={4}>
        <VStack spacing={3} align="stretch">
          {messages.map(message => {
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
