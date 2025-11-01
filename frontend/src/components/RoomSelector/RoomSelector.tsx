"use client";
import { ChatRoomsService } from "@/services";
import { ChatRoom } from "@/types";
import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemIndicator,
  AccordionItemTrigger,
  AccordionRoot,
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
import { useEffect, useState } from "react";

type Props = {
  rooms: ChatRoom[];
  selectedRoom: ChatRoom | null;
  onRoomSelect: (room: ChatRoom) => void;
};

const ROOMS_ACCORDION_ITEM_VALUE = "rooms";

export const RoomSelector = ({ rooms, selectedRoom, onRoomSelect }: Props) => {
  const { open, onOpen, onClose } = useDisclosure();

  const [chatRooms, setChatRooms] = useState<ChatRoom[]>(rooms);
  const [newRoomName, setNewRoomName] = useState("");
  const [newRoomDescription, setNewRoomDescription] = useState("");
  const [openAccordionItems, setOpenAccordionItems] = useState([
    ROOMS_ACCORDION_ITEM_VALUE,
  ]);

  // Automatically collapse when room is selected
  useEffect(() => {
    if (selectedRoom) setOpenAccordionItems([]);
  }, [selectedRoom]);

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
    <Box borderBottom="2px" borderColor="gray.300">
      <AccordionRoot
        collapsible
        value={openAccordionItems}
        onValueChange={({ value }) => setOpenAccordionItems(value)}
      >
        <AccordionItem value={ROOMS_ACCORDION_ITEM_VALUE}>
          <AccordionItemTrigger
            px={4}
            py={3}
            _hover={{ bg: "gray.50" }}
            _expanded={{
              bg: "gray.50",
              borderBottom: "1px",
              borderColor: "gray.200",
            }}
          >
            <Heading size="md" flex="1" textAlign="left">
              {selectedRoom
                ? `Wybrany pokój: ${selectedRoom.name}`
                : "Dostępne pokoje"}
            </Heading>
            <AccordionItemIndicator />
          </AccordionItemTrigger>

          <AccordionItemContent>
            <Box pb={4} px={4}>
              <VStack gap={4} align="stretch" pt={4}>
                <Flex justify="flex-end">
                  <Button size="sm" colorScheme="blue" onClick={onOpen}>
                    + Dodaj pokój
                  </Button>
                </Flex>

                <VStack gap={2} align="stretch">
                  {chatRooms.map(room => (
                    <Box
                      key={room.id}
                      p={3}
                      border="2px"
                      borderColor={
                        selectedRoom?.id === room.id ? "blue.500" : "gray.200"
                      }
                      borderRadius="md"
                      cursor="pointer"
                      bg={selectedRoom?.id === room.id ? "blue.50" : "white"}
                      _hover={{
                        bg:
                          selectedRoom?.id === room.id ? "blue.50" : "gray.50",
                        borderColor:
                          selectedRoom?.id === room.id
                            ? "blue.600"
                            : "gray.300",
                      }}
                      onClick={() => onRoomSelect(room)}
                      transition="all 0.2s"
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
              </VStack>
            </Box>
          </AccordionItemContent>
        </AccordionItem>
      </AccordionRoot>

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
