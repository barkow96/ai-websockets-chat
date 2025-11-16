"use client";
import { ChatRoomsService } from "@/services";
import { ChatRoom } from "@/types";
import { useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { CreateRoomModal } from "./CreateRoomModal";
import { RoomSelectorAccordion } from "./RoomSelectorAccordion";

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

  const handleCreateRoom = async () => {
    if (!newRoomName.trim()) return;

    const createdChatRoom = await ChatRoomsService.createChatRoom({
      name: newRoomName,
      description: newRoomDescription,
    });

    if (!createdChatRoom) return;

    setChatRooms(prev => [...prev, createdChatRoom]);
    setNewRoomName("");
    setNewRoomDescription("");
    onClose();
  };

  useEffect(() => {
    if (selectedRoom) setOpenAccordionItems([]);
  }, [selectedRoom]);

  return (
    <>
      <RoomSelectorAccordion
        rooms={chatRooms}
        selectedRoom={selectedRoom}
        onRoomSelect={onRoomSelect}
        onAddRoomClick={onOpen}
        openAccordionItems={openAccordionItems}
        onAccordionChange={setOpenAccordionItems}
      />

      <CreateRoomModal
        isOpen={open}
        onClose={onClose}
        roomName={newRoomName}
        roomDescription={newRoomDescription}
        onRoomNameChange={setNewRoomName}
        onRoomDescriptionChange={setNewRoomDescription}
        onCreate={handleCreateRoom}
      />
    </>
  );
};
