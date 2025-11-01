"use client";
import { Box, Button, Flex, Input, Stack, Text } from "@chakra-ui/react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  roomName: string;
  roomDescription: string;
  onRoomNameChange: (value: string) => void;
  onRoomDescriptionChange: (value: string) => void;
  onCreate: () => void;
};

export const CreateRoomModal = ({
  isOpen,
  onClose,
  roomName,
  roomDescription,
  onRoomNameChange,
  onRoomDescriptionChange,
  onCreate,
}: Props) => {
  if (!isOpen) return null;

  return (
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
              value={roomName}
              onChange={e => onRoomNameChange(e.target.value)}
              placeholder="Enter room name"
            />
          </Box>
          <Box>
            <Text fontSize="sm" fontWeight="bold" mb={2}>
              Description (optional)
            </Text>
            <Input
              value={roomDescription}
              onChange={e => onRoomDescriptionChange(e.target.value)}
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
            onClick={onCreate}
            disabled={!roomName.trim()}
          >
            Create Room
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

