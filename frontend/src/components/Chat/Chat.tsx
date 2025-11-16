"use client";
import { useSocketIo } from "@/providers";
import { AiService } from "@/services";
import {
  ChatMessageReceiveEventsData,
  ChatRoom,
  Message,
  OChatEvent,
  User,
} from "@/types";
import { Box } from "@chakra-ui/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ChatContainer } from "./ChatContainer";
import { ChatEmptyState } from "./ChatEmptyState";
import { MessageControls } from "./MessageControls";
import { MessagesList } from "./MessagesList";

type Props = {
  selectedRoomInitialMessages: Message[];
  selectedUser: User | null;
  selectedRoom: ChatRoom | null;
  isAiEnabled: boolean;
};

export const Chat = ({
  selectedRoomInitialMessages,
  selectedUser,
  selectedRoom,
  isAiEnabled,
}: Props) => {
  const [messageText, setMessageText] = useState("");
  const [messages, setMessages] = useState<Message[]>(
    selectedRoomInitialMessages
  );
  const { socket } = useSocketIo();
  const [isFullAiModeEnabled, setIsFullAiModeEnabled] = useState(false);
  const [isGeneratingAiResponse, setIsGeneratingAiResponse] = useState(false);
  const prevMessagesRef = useRef<Message[]>(messages);

  const toggleFullAiMode = useCallback(
    () => setIsFullAiModeEnabled(prev => !prev),
    []
  );

  const showMessages = useMemo(
    () => selectedRoom && selectedUser,
    [selectedRoom, selectedUser]
  );

  const handleSendMessage = useCallback(
    (text?: string) => {
      const textToBeSent = text ?? messageText;

      if (
        textToBeSent.trim().length === 0 ||
        !selectedRoom ||
        !selectedUser ||
        selectedRoom?.id.length === 0
      ) {
        return;
      }

      socket?.emit(OChatEvent.MessageNew, {
        chatRoomId: selectedRoom.id,
        message: textToBeSent.trim(),
        senderId: selectedUser.id,
        timestamp: new Date(),
      });
      setMessageText("");
    },
    [messageText, selectedRoom, selectedUser, socket]
  );

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

  const generateResponse = useCallback(async () => {
    if (!selectedUser) return null;

    setIsGeneratingAiResponse(true);

    const aiMessageResponse = await AiService.generateResponse(
      messages,
      selectedUser?.id
    );

    setIsGeneratingAiResponse(false);

    if (!aiMessageResponse) return null;
    return aiMessageResponse.message;
  }, [messages, selectedUser]);

  // UseEffect 1: react on changes of user, chat room or initial messages
  useEffect(() => {
    if (!selectedRoom || !selectedUser) setMessages([]);
    else setMessages(selectedRoomInitialMessages);
  }, [selectedRoom, selectedUser, selectedRoomInitialMessages]);

  // UseEffect 2: listen for new messages in the current chat room
  useEffect(() => {
    if (!socket) return;

    socket.on(OChatEvent.MessageNew, (data: ChatMessageReceiveEventsData) =>
      handleNewMessage(data)
    );

    return () => {
      socket.off(OChatEvent.MessageNew);
    };
  }, [socket, handleNewMessage]);

  // UseEffect 3: Full AI Moode - generate response for the last message if it's not from the selected user
  useEffect(() => {
    if (!isFullAiModeEnabled || !selectedUser) {
      prevMessagesRef.current = messages;
      return;
    }

    const messagesChanged =
      prevMessagesRef.current.length !== messages.length ||
      prevMessagesRef.current.some(
        (msg, index) => msg.id !== messages[index]?.id
      );

    if (!messagesChanged) {
      prevMessagesRef.current = messages;
      return;
    }

    const lastMessage = messages[messages.length - 1];
    if (!lastMessage || lastMessage.senderId === selectedUser.id) {
      prevMessagesRef.current = messages;
      return;
    }

    generateResponse().then(responseText => {
      if (responseText) handleSendMessage(responseText);
      prevMessagesRef.current = messages;
    });
  }, [
    isFullAiModeEnabled,
    messages,
    selectedUser,
    generateResponse,
    handleSendMessage,
  ]);

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
        {showMessages ? (
          <MessagesList messages={messages} selectedUser={selectedUser} />
        ) : (
          <ChatEmptyState
            selectedUser={selectedUser}
            selectedRoom={selectedRoom}
          />
        )}
      </ChatContainer>

      {showMessages && (
        <MessageControls
          messageText={messageText}
          onMessageTextChange={setMessageText}
          onSend={handleSendMessage}
          isAiEnabled={isAiEnabled}
          onGenerateAiResponse={async () => {
            const response = await generateResponse();
            if (response) setMessageText(response);
          }}
          isGeneratingAiResponse={isGeneratingAiResponse}
          onToggleFullAiMode={toggleFullAiMode}
          isFullAiModeEnabled={isFullAiModeEnabled}
        />
      )}
    </Box>
  );
};
