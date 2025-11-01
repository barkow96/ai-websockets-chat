"use client";
import { User } from "@/types";
import { Box, Grid, VStack } from "@chakra-ui/react";
import { UserCard } from "./UserCard";

type Props = {
  users: User[];
  selectedUser: User | null;
  onUserSelect: (user: User) => void;
};

export const UsersList = ({ users, selectedUser, onUserSelect }: Props) => {
  return (
    <Box pb={4} px={4}>
      <VStack gap={4} align="stretch" pt={4}>
        <Grid templateColumns="repeat(auto-fit, minmax(200px, 1fr))" gap={3}>
          {users.map(user => (
            <UserCard
              key={user.id}
              user={user}
              isSelected={selectedUser?.id === user.id}
              onSelect={onUserSelect}
            />
          ))}
        </Grid>
      </VStack>
    </Box>
  );
};
