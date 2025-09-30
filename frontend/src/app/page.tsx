"use client";
import { Chat } from "@/components";
import { Box } from "@chakra-ui/react";

export default function Home() {
  return (
    <Box width="100%" maxWidth="1200px" margin="0 auto">
      <Chat />
    </Box>
  );
}
