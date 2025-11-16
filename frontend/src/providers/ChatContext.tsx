import { useSocketIo } from "@/providers";
import { AiService } from "@/services";
import {
  ChatMessageReceiveEventsData,
  ChatRoom,
  Message,
  OChatEvent,
  User,
} from "@/types";
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

type ChatContextType = {
  messages: Message[];
  selectedUser: User | null;
  selectedRoom: ChatRoom | null;
  showMessages: boolean;
  messageText: string;
  setMessageText: (text: string) => void;
  sendMessage: (text?: string) => void;
  isAiEnabled: boolean;
  generateAiResponse: () => Promise<string | null>;
  isGeneratingAiResponse: boolean;
  toggleFullAiMode: () => void;
  isFullAiModeEnabled: boolean;
};

export const ChatContext = createContext<ChatContextType | undefined>(
  undefined
);

type Props = PropsWithChildren & {
  selectedRoomInitialMessages: Message[];
  selectedUser: User | null;
  selectedRoom: ChatRoom | null;
  isAiEnabled: boolean;
};

export const ChatProvider = ({
  children,
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
    () => !!selectedRoom && !!selectedUser,
    [selectedRoom, selectedUser]
  );

  const sendMessage = useCallback(
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

  const handleNewMessageReceived = useCallback(
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

  const generateAiResponse = useCallback(async () => {
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
      handleNewMessageReceived(data)
    );

    return () => {
      socket.off(OChatEvent.MessageNew);
    };
  }, [socket, handleNewMessageReceived]);

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

    generateAiResponse().then(responseText => {
      if (responseText) sendMessage(responseText);
      prevMessagesRef.current = messages;
    });
  }, [
    isFullAiModeEnabled,
    messages,
    selectedUser,
    generateAiResponse,
    sendMessage,
  ]);

  return (
    <ChatContext.Provider
      value={{
        messages,
        selectedUser,
        selectedRoom,
        showMessages,
        messageText,
        setMessageText,
        sendMessage,
        isAiEnabled,
        generateAiResponse,
        isGeneratingAiResponse,
        toggleFullAiMode,
        isFullAiModeEnabled,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider");
  }

  return context;
};
