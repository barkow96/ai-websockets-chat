"use client";
import { ChatRoom } from "@/types";
import { Button, VStack } from "@chakra-ui/react";
import { RoomCard } from "./RoomCard";

type Props = {
  rooms: ChatRoom[];
  selectedRoom: ChatRoom | null;
  onRoomSelect: (room: ChatRoom) => void;
  onAddRoomClick: () => void;
};

export const RoomsList = ({
  rooms,
  selectedRoom,
  onRoomSelect,
  onAddRoomClick,
}: Props) => {
  return (
    <VStack gap={4} align="stretch" p={4}>
      <Button size="sm" colorScheme="blue" onClick={onAddRoomClick}>
        + Add room
      </Button>

      <VStack gap={2} align="stretch">
        {rooms.map(room => (
          <RoomCard
            key={room.id}
            room={room}
            isSelected={selectedRoom?.id === room.id}
            onSelect={onRoomSelect}
          />
        ))}
      </VStack>
    </VStack>
  );
};
