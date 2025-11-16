"use client";
import { gradientAi } from "@/styles";
import { Flex, Switch, Text } from "@chakra-ui/react";

type Props = {
  isAiEnabled: boolean;
  onAiToggle: (enabled: boolean) => void;
};

export const AiToggleSwitch = ({ isAiEnabled, onAiToggle }: Props) => {
  return (
    <Flex align="center" gap={2} mr={2}>
      <Text fontSize="xs" fontWeight="medium" color="gray.700">
        AI
      </Text>

      <Switch.Root
        checked={isAiEnabled}
        onCheckedChange={({ checked }) => onAiToggle(checked)}
        onClick={(e: React.MouseEvent) => e.stopPropagation()}
      >
        <Switch.HiddenInput />
        <Switch.Control
          style={{
            background: isAiEnabled ? gradientAi : undefined,
          }}
        >
          <Switch.Thumb />
        </Switch.Control>
      </Switch.Root>
    </Flex>
  );
};
