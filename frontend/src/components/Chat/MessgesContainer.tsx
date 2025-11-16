"use client";
import { Box } from "@chakra-ui/react";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export const MessagesContainer = ({ children }: Props) => {
  return (
    <Box
      flex="1"
      padding={4}
      background="white"
      overflowY="auto"
      css={{
        "&::-webkit-scrollbar": {
          width: "8px",
        },
        "&::-webkit-scrollbar-track": {
          background: "#f1f1f1",
        },
        "&::-webkit-scrollbar-thumb": {
          background: "#888",
          borderRadius: "4px",
        },
        "&::-webkit-scrollbar-thumb:hover": {
          background: "#555",
        },
      }}
    >
      {children}
    </Box>
  );
};
