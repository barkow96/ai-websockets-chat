"use client";
import { SocketIoProvider } from "@/providers";
import { theme } from "@/styles";
import { ChakraProvider } from "@chakra-ui/react";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SocketIoProvider>
      <ChakraProvider theme={theme}>{children}</ChakraProvider>
    </SocketIoProvider>
  );
}
