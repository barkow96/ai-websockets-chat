"use client";
import { User } from "@/types";
import { Button, Stack, Text } from "@chakra-ui/react";

type Props = {
  user: User;
  isSelected: boolean;
  onSelect: (user: User) => void;
};

export const UserCardButton = ({ user, isSelected, onSelect }: Props) => {
  return (
    <Button
      onClick={() => onSelect(user)}
      variant={isSelected ? "solid" : "outline"}
      colorScheme={isSelected ? "blue" : "gray"}
      height="auto"
      minH="80px"
      padding={4}
    >
      <Stack align="center" gap={2}>
        <Stack
          align="center"
          justify="center"
          width="48px"
          height="48px"
          borderRadius="full"
          background="blue.500"
          color="white"
          fontSize="lg"
          fontWeight="bold"
        >
          {user.name.charAt(0).toUpperCase()}
        </Stack>

        <Text fontSize="sm" fontWeight="medium">
          {user.name}
        </Text>

        <Text fontSize="xs" color="gray.500">
          ID: {user.id}
        </Text>
      </Stack>
    </Button>
  );
};
