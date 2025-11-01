"use client";
import { ChatRoom } from "@/types";
import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemIndicator,
  AccordionItemTrigger,
  AccordionRoot,
  Box,
  Heading,
} from "@chakra-ui/react";
import { RoomsList } from "./RoomsList";

const ROOMS_ACCORDION_ITEM_VALUE = "rooms";

type Props = {
  rooms: ChatRoom[];
  selectedRoom: ChatRoom | null;
  onRoomSelect: (room: ChatRoom) => void;
  onAddRoomClick: () => void;
  openAccordionItems: string[];
  onAccordionChange: (value: string[]) => void;
};

export const RoomSelectorAccordion = ({
  rooms,
  selectedRoom,
  onRoomSelect,
  onAddRoomClick,
  openAccordionItems,
  onAccordionChange,
}: Props) => {
  return (
    <Box borderBottom="2px" borderColor="gray.300">
      <AccordionRoot
        collapsible
        value={openAccordionItems}
        onValueChange={({ value }) => onAccordionChange(value)}
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
                ? `Selected room: ${selectedRoom.name}`
                : "Select a room"}
            </Heading>
            <AccordionItemIndicator />
          </AccordionItemTrigger>

          <AccordionItemContent>
            <RoomsList
              rooms={rooms}
              selectedRoom={selectedRoom}
              onRoomSelect={onRoomSelect}
              onAddRoomClick={onAddRoomClick}
            />
          </AccordionItemContent>
        </AccordionItem>
      </AccordionRoot>
    </Box>
  );
};
