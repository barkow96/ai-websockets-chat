"use client";
import { User } from "@/types";
import { Grid, VStack } from "@chakra-ui/react";
import { UserCardButton } from "./UserCardButton";

type Props = {
  users: User[];
  selectedUser: User | null;
  onUserSelect: (user: User) => void;
};

export const UsersList = ({ users, selectedUser, onUserSelect }: Props) => {
  return (
    <VStack gap={4} align="stretch" p={4}>
      <Grid templateColumns="repeat(auto-fit, minmax(200px, 1fr))" gap={3}>
        {users.map(user => (
          <UserCardButton
            key={user.id}
            user={user}
            isSelected={selectedUser?.id === user.id}
            onSelect={onUserSelect}
          />
        ))}
      </Grid>
    </VStack>
  );
};
