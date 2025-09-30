import { ChatRoomsService } from "@/services";
import { ChatRoom } from "@/types";
import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

type Props = {
  onRoomSelect: (room: ChatRoom) => void;
};

export const RoomSelector = ({ onRoomSelect }: Props) => {
  const [selectedRoom, setSelectedRoom] = useState<ChatRoom | null>(null);
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
  const [loading, setLoading] = useState(true);
  const [newRoomName, setNewRoomName] = useState("");
  const [newRoomDescription, setNewRoomDescription] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    loadChatRooms();
  }, []);

  const loadChatRooms = async () => {
    try {
      setLoading(true);
      const rooms = await ChatRoomsService.getChatRooms();
      setChatRooms(rooms);
    } catch (error) {
      console.error("Failed to load chat rooms:", error);
    } finally {
      setLoading(false);
    }
  };

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

  const handleSelectRoom = (room: ChatRoom) => {
    setSelectedRoom(room);
    onRoomSelect(room);
  };

  if (loading) {
    return (
      <Box p={4}>
        <Text>Ładowanie pokoi...</Text>
      </Box>
    );
  }

  return (
    <Box p={4} borderRight="1px" borderColor="gray.200" minW="300px">
      <Flex justify="space-between" align="center" mb={4}>
        <Heading size="md">Dostępne pokoje</Heading>
        <Button size="sm" colorScheme="blue" onClick={onOpen}>
          + Dodaj pokój
        </Button>
      </Flex>

      <VStack spacing={2} align="stretch">
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
            onClick={() => handleSelectRoom(room)}
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
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create New Chat Room</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={4}>
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
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button
              colorScheme="blue"
              onClick={handleCreateRoom}
              isDisabled={!newRoomName.trim()}
            >
              Create Room
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};
