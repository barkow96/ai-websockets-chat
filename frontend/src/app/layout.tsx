import { Box } from "@chakra-ui/react";
import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Websockets Chat App",
  description: "Websockets Chat App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Box width="100%" maxWidth="1200px" margin="0 auto" padding="16px">
            {children}
          </Box>
        </Providers>
      </body>
    </html>
  );
}
