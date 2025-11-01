"use client";
import { User } from "@/types";
import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemIndicator,
  AccordionItemTrigger,
  AccordionRoot,
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

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
            <AccordionItemIndicator />
          </AccordionItemTrigger>

          <AccordionItemContent>
            <Box pb={4} px={4}>
              <VStack gap={4} align="stretch" pt={4}>
                <Grid
                  templateColumns="repeat(auto-fit, minmax(200px, 1fr))"
                  gap={3}
                >
                  {users.map(user => (
                    <Button
                      key={user.id}
                      variant={
                        selectedUser?.id === user.id ? "solid" : "outline"
                      }
                      colorScheme={
                        selectedUser?.id === user.id ? "blue" : "gray"
                      }
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
              </VStack>
            </Box>
          </AccordionItemContent>
        </AccordionItem>
      </AccordionRoot>
    </Box>
  );
};
