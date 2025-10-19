"use client";
import { User } from "@/types";
import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";

type Props = {
  users: User[];
  selectedUser: User | null;
  onUserSelect: (user: User) => void;
};

export const Users = ({ users, selectedUser, onUserSelect }: Props) => {
  return (
    <Box p={4} borderBottom="1px" borderColor="gray.200">
      <VStack gap={4} align="stretch">
        <Heading size="md" textAlign="center">
          Wybierz użytkownika
        </Heading>

        <Grid templateColumns="repeat(auto-fit, minmax(200px, 1fr))" gap={3}>
          {users.map(user => (
            <Button
              key={user.id}
              variant={selectedUser?.id === user.id ? "solid" : "outline"}
              colorScheme={selectedUser?.id === user.id ? "blue" : "gray"}
              onClick={() => onUserSelect(user)}
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
          ))}
        </Grid>

        {selectedUser && (
          <Box
            p={3}
            bg="blue.50"
            borderRadius="md"
            border="1px"
            borderColor="blue.200"
          >
            <Text fontSize="sm" color="blue.700" textAlign="center">
              ✅ Zalogowany jako: <strong>{selectedUser.name}</strong>
            </Text>
          </Box>
        )}
      </VStack>
    </Box>
  );
};
