"use client";
import { Chat, RoomSelector, Users } from "@/components";
import { useSocketIo } from "@/providers";
import { ChatRoomMessagesService } from "@/services";
import { ChatRoom, Message, OChatEvent, User } from "@/types";
import { VStack } from "@chakra-ui/react";
import { useCallback, useState } from "react";

type Props = {
  users: User[];
  chatRooms: ChatRoom[];
};

export function ChatView({ users, chatRooms }: Props) {
  const { socket } = useSocketIo();

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<ChatRoom | null>(null);
  const [selectedRoomMessages, setSelectedRoomMessages] = useState<Message[]>(
    []
  );

  const handleRoomSelect = useCallback(
    async (room: ChatRoom) => {
      socket?.emit(OChatEvent.Watch, { chatRoomId: room.id });
      setSelectedRoom(room);

      const messages = await ChatRoomMessagesService.getChatRoomMessages(
        room.id
      );
      setSelectedRoomMessages(messages);
    },
    [socket]
  );

  return (
    <VStack spacing={0} align="stretch">
      <Users
        users={users}
        selectedUser={selectedUser}
        onUserSelect={setSelectedUser}
      />

      <RoomSelector
        rooms={chatRooms}
        selectedRoom={selectedRoom}
        onRoomSelect={handleRoomSelect}
      />

      <Chat
        messages={selectedRoomMessages}
        selectedUser={selectedUser}
        selectedRoom={selectedRoom}
      />
    </VStack>
  );
}
