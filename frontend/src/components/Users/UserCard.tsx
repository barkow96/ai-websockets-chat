"use client";
import { User } from "@/types";
import { Box, Button, Flex, Text } from "@chakra-ui/react";

type Props = {
  user: User;
  isSelected: boolean;
  onSelect: (user: User) => void;
};

export const UserCard = ({ user, isSelected, onSelect }: Props) => {
  return (
    <Button
      variant={isSelected ? "solid" : "outline"}
      colorScheme={isSelected ? "blue" : "gray"}
      onClick={() => onSelect(user)}
      p={4}
      h="auto"
      minH="80px"
    >
      <Flex direction="column" align="center" gap={2}>
        <Box
          w="48px"
          h="48px"
          borderRadius="full"
          bg="blue.500"
          display="flex"
          alignItems="center"
          justifyContent="center"
          color="white"
          fontSize="lg"
          fontWeight="bold"
        >
          {user.name.charAt(0).toUpperCase()}
        </Box>
        <Text fontSize="sm" fontWeight="medium">
          {user.name}
        </Text>
        <Text fontSize="xs" color="gray.500">
          ID: {user.id}
        </Text>
      </Flex>
    </Button>
  );
};

