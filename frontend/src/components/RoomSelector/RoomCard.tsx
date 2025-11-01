"use client";
import { ChatRoom } from "@/types";
import { Box, Text } from "@chakra-ui/react";

type Props = {
  room: ChatRoom;
  isSelected: boolean;
  onSelect: (room: ChatRoom) => void;
};

export const RoomCard = ({ room, isSelected, onSelect }: Props) => {
  return (
    <Box
      padding={3}
      border="2px"
      borderColor={isSelected ? "blue.500" : "gray.200"}
      borderRadius="md"
      cursor="pointer"
      bg={isSelected ? "blue.50" : "white"}
      _hover={{
        bg: isSelected ? "blue.50" : "gray.50",
        borderColor: isSelected ? "blue.600" : "gray.300",
      }}
      onClick={() => onSelect(room)}
      transition="all 0.2s"
    >
      <Text fontWeight="bold" fontSize="sm">
        {room.name}
      </Text>
      <Text fontSize="xs" color="gray.600">
        {room.description}
      </Text>
    </Box>
  );
};
