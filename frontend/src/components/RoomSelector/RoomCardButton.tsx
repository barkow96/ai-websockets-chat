"use client";
import { ChatRoom } from "@/types";
import { Button, Text, VStack } from "@chakra-ui/react";

type Props = {
  room: ChatRoom;
  isSelected: boolean;
  onSelect: (room: ChatRoom) => void;
};

export const RoomCardButton = ({ room, isSelected, onSelect }: Props) => {
  return (
    <Button
      variant="ghost"
      onClick={() => onSelect(room)}
      height="auto"
      padding={3}
      background={isSelected ? "blue.50" : "white"}
      border="2px"
      borderColor={isSelected ? "blue.500" : "gray.200"}
      borderRadius="md"
      transition="all 0.2s"
      _hover={{
        background: isSelected ? "blue.50" : "gray.50",
        borderColor: isSelected ? "blue.600" : "gray.300",
      }}
    >
      <VStack align="stretch" gap={0} w="100%">
        <Text fontWeight="bold" fontSize="sm" textAlign="left">
          {room.name}
        </Text>
        <Text fontSize="xs" color="gray.600" textAlign="left">
          {room.description}
        </Text>
      </VStack>
    </Button>
  );
};
