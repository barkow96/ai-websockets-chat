"use client";
import { Heading } from "@chakra-ui/react";

export const ChatHeading = () => {
  return (
    <Heading
      size="lg"
      textAlign="center"
      paddingY={4}
      paddingX={4}
      background="blue.50"
      borderBottom="2px solid"
      borderColor="blue.200"
    >
      WebSocket Chat Application
    </Heading>
  );
};
