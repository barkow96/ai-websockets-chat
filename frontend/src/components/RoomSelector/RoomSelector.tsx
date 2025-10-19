"use client";
import { ChatRoomsService } from "@/services";
import { ChatRoom } from "@/types";
import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Stack,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";

type Props = {
  rooms: ChatRoom[];
  selectedRoom: ChatRoom | null;
  onRoomSelect: (room: ChatRoom) => void;
};

export const RoomSelector = ({ rooms, selectedRoom, onRoomSelect }: Props) => {
  const { open, onOpen, onClose } = useDisclosure();

  const [chatRooms, setChatRooms] = useState<ChatRoom[]>(rooms);
  const [newRoomName, setNewRoomName] = useState("");
  const [newRoomDescription, setNewRoomDescription] = useState("");

  const handleCreateRoom = async () => {
    if (!newRoomName.trim()) return;

    try {
      const newRoom = await ChatRoomsService.createChatRoom({
        name: newRoomName,
        description: newRoomDescription,
      });

      setChatRooms(prev => [...prev, newRoom]);
      setNewRoomName("");
      setNewRoomDescription("");
      onClose();
    } catch (error) {
      console.error("Failed to create chat room:", error);
    }
  };

  return (
    <Box p={4} borderRight="1px" borderColor="gray.200" minW="300px">
      <Flex justify="space-between" align="center" mb={4}>
        <Heading size="md">Dostępne pokoje</Heading>
        <Button size="sm" colorScheme="blue" onClick={onOpen}>
          + Dodaj pokój
        </Button>
      </Flex>

      <VStack gap={2} align="stretch">
        {chatRooms.map(room => (
          <Box
            key={room.id}
            p={3}
            border="1px"
            borderColor={selectedRoom?.id === room.id ? "blue.500" : "gray.200"}
            borderRadius="md"
            cursor="pointer"
            bg={selectedRoom?.id === room.id ? "blue.50" : "white"}
            _hover={{ bg: "gray.50" }}
            onClick={() => onRoomSelect(room)}
          >
            <Text fontWeight="bold" fontSize="sm">
              {room.name}
            </Text>
            <Text fontSize="xs" color="gray.600">
              {room.description}
            </Text>
          </Box>
        ))}
      </VStack>

      {/* Create Room Modal */}
      {open && (
        <Box
          position="fixed"
          top={0}
          left={0}
          right={0}
          bottom={0}
          bg="blackAlpha.600"
          zIndex={1000}
          display="flex"
          alignItems="center"
          justifyContent="center"
          onClick={onClose}
        >
          <Box
            bg="white"
            p={6}
            borderRadius="md"
            minW="400px"
            onClick={e => e.stopPropagation()}
          >
            <Text fontSize="lg" fontWeight="bold" mb={4}>
              Create New Chat Room
            </Text>
            <Stack gap={4}>
              <Box>
                <Text fontSize="sm" fontWeight="bold" mb={2}>
                  Room Name
                </Text>
                <Input
                  value={newRoomName}
                  onChange={e => setNewRoomName(e.target.value)}
                  placeholder="Enter room name"
                />
              </Box>
              <Box>
                <Text fontSize="sm" fontWeight="bold" mb={2}>
                  Description (optional)
                </Text>
                <Input
                  value={newRoomDescription}
                  onChange={e => setNewRoomDescription(e.target.value)}
                  placeholder="Enter room description"
                />
              </Box>
            </Stack>
            <Flex gap={3} mt={6} justify="flex-end">
              <Button variant="ghost" onClick={onClose}>
                Cancel
              </Button>
              <Button
                colorScheme="blue"
                onClick={handleCreateRoom}
                disabled={!newRoomName.trim()}
              >
                Create Room
              </Button>
            </Flex>
          </Box>
        </Box>
      )}
    </Box>
  );
};
