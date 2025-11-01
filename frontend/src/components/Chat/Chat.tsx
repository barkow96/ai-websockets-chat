"use client";
import { useSocketIo } from "@/providers";
import {
  ChatMessageReceiveEventsData,
  ChatRoom,
  Message,
  OChatEvent,
  User,
} from "@/types";
import { Box } from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import { ChatContainer } from "./ChatContainer";
import { ChatEmptyState } from "./ChatEmptyState";
import { MessageInput } from "./MessageInput";
import { MessagesList } from "./MessagesList";

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

  const showMessages = selectedRoom && selectedUser;

  const handleSendMessage = () => {
    if (
      messageText.trim().length === 0 ||
      !selectedRoom ||
      !selectedUser ||
      selectedRoom?.id.length === 0
    ) {
      return;
    }

    socket?.emit(OChatEvent.MessageNew, {
      chatRoomId: selectedRoom.id,
      message: messageText.trim(),
      senderId: selectedUser.id,
      timestamp: new Date(),
    });
    setMessageText("");
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
    if (!selectedRoom || !selectedUser) setMessages([]);
  }, [selectedRoom, selectedUser]);

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
      <ChatContainer>
        {showMessages && (
          <MessagesList messages={messages} selectedUser={selectedUser} />
        )}

        {!showMessages && (
          <ChatEmptyState
            selectedUser={selectedUser}
            selectedRoom={selectedRoom}
          />
        )}
      </ChatContainer>

      {showMessages && (
        <MessageInput
          messageText={messageText}
          onMessageTextChange={setMessageText}
          onSend={handleSendMessage}
        />
      )}
    </Box>
  );
};
