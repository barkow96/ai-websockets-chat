"use client";
import { User } from "@/types";
import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemIndicator,
  AccordionItemTrigger,
  AccordionRoot,
  Box,
  Heading,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { AiToggle } from "./AiToggle";
import { UsersList } from "./UsersList";

const USERS_ACCORDION_ITEM_VALUE = "users";

type Props = {
  users: User[];
  selectedUser: User | null;
  onUserSelect: (user: User) => void;
  isAiEnabled: boolean;
  onAiToggle: (enabled: boolean) => void;
};

export const Users = ({
  users,
  selectedUser,
  onUserSelect,
  isAiEnabled,
  onAiToggle,
}: Props) => {
  const [openAccordionItems, setOpenAccordionItems] = useState([
    USERS_ACCORDION_ITEM_VALUE,
  ]);

  useEffect(() => {
    if (selectedUser) setOpenAccordionItems([]);
  }, [selectedUser]);

  return (
    <Box borderBottom="2px" borderColor="gray.300">
      <AccordionRoot
        collapsible
        value={openAccordionItems}
        onValueChange={({ value }) => setOpenAccordionItems(value)}
      >
        <AccordionItem value={USERS_ACCORDION_ITEM_VALUE}>
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
              {selectedUser
                ? `Logged in as: ${selectedUser.name}`
                : "Select a user"}
            </Heading>
            {selectedUser && (
              <AiToggle isAiEnabled={isAiEnabled} onAiToggle={onAiToggle} />
            )}
            <AccordionItemIndicator />
          </AccordionItemTrigger>

          <AccordionItemContent>
            <UsersList
              users={users}
              selectedUser={selectedUser}
              onUserSelect={onUserSelect}
            />
          </AccordionItemContent>
        </AccordionItem>
      </AccordionRoot>
    </Box>
  );
};
