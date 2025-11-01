"use client";
import { User } from "@/types";
import { useEffect, useState } from "react";
import { UsersAccordion } from "./UsersAccordion";

type Props = {
  users: User[];
  selectedUser: User | null;
  onUserSelect: (user: User) => void;
};

const USERS_ACCORDION_ITEM_VALUE = "users";

export const Users = ({ users, selectedUser, onUserSelect }: Props) => {
  const [openAccordionItems, setOpenAccordionItems] = useState([
    USERS_ACCORDION_ITEM_VALUE,
  ]);

  useEffect(() => {
    if (selectedUser) setOpenAccordionItems([]);
  }, [selectedUser]);

  return (
    <UsersAccordion
      users={users}
      selectedUser={selectedUser}
      onUserSelect={onUserSelect}
      openAccordionItems={openAccordionItems}
      onAccordionChange={setOpenAccordionItems}
    />
  );
};
