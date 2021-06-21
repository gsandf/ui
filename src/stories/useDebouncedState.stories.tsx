import { Meta, Story } from '@storybook/react';
import React, { useEffect, useState } from 'react';
import { Box, Center, VStack } from '../components';
import { useDebouncedState } from '../hooks';

export default {
  title: 'Hooks/useDebouncedState',
  parameters: {
    layout: 'centered'
  }
} as Meta<void>;

export const BasicUsage: Story<void> = () => {
  const [triggerCountTotal, setTriggerCountTotal] = useState(0);
  const [triggerCountDebounced, setTriggerCountDebounced] =
    useDebouncedState(0);

  const incrementTriggerCount = () => {
    setTriggerCountDebounced(n => n + 1);
    setTriggerCountTotal(n => n + 1);
  };

  useEffect(() => {
    document.addEventListener('mousemove', incrementTriggerCount);

    return () => {
      document.removeEventListener('mousemove', incrementTriggerCount);
    };
  });

  return (
    <Center>
      <VStack $bgColor="darken" $p={8}>
        <Box>Move the mouse to trigger the event</Box>

        <Box $py={3} />

        <VStack>
          <Box>Total times triggered: {triggerCountTotal}</Box>
          <Box>Times triggered - debounced: {triggerCountDebounced}</Box>
        </VStack>
      </VStack>
    </Center>
  );
};
