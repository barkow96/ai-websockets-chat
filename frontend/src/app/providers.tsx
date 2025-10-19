"use client";
import { SocketIoProvider } from "@/providers";
import { system } from "@/styles";
import { ChakraProvider } from "@chakra-ui/react";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SocketIoProvider>
      <ChakraProvider value={system}>{children}</ChakraProvider>
    </SocketIoProvider>
  );
}
