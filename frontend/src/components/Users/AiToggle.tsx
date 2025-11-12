"use client";
import { Box, Flex, Text } from "@chakra-ui/react";

type Props = {
  isAiEnabled: boolean;
  onAiToggle: (enabled: boolean) => void;
};

export const AiToggle = ({ isAiEnabled, onAiToggle }: Props) => {
  return (
    <Flex align="center" gap={2} mr={2}>
      <Text fontSize="xs" fontWeight="medium" color="gray.700">
        AI
      </Text>
      <Box
        as="label"
        position="relative"
        display="inline-block"
        width="44px"
        height="24px"
        cursor="pointer"
        onClick={(e: React.MouseEvent) => e.stopPropagation()}
      >
        <input
          type="checkbox"
          checked={isAiEnabled}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onAiToggle(e.target.checked)
          }
          onClick={(e: React.MouseEvent) => e.stopPropagation()}
          style={{
            position: "absolute",
            opacity: 0,
            width: 0,
            height: 0,
          }}
        />
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          bg={isAiEnabled ? "transparent" : "gray.300"}
          borderRadius="full"
          transition="all 0.3s"
          _before={{
            content: '""',
            position: "absolute",
            height: "18px",
            width: "18px",
            left: "3px",
            bottom: "3px",
            bg: "white",
            borderRadius: "full",
            transition: "all 0.3s",
            transform: isAiEnabled ? "translateX(20px)" : "translateX(0)",
            boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
          }}
          style={{
            background: isAiEnabled
              ? "linear-gradient(to right, #9f7aea, #ed64a6, #f6ad55)"
              : undefined,
          }}
        />
      </Box>
    </Flex>
  );
};

