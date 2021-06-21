import { Meta } from '@storybook/react';
import React, { useRef, useState } from 'react';
import { Box, Center, VStack } from '../components';
import { useClickedOutside } from '../hooks';

export default {
  title: 'Hooks/useClickedOutside',
  parameters: {
    layout: 'centered'
  }
} as Meta<void>;

type ClickLocation = 'inside' | 'outside';

export const BasicUsage = () => {
  const containerRef = useRef(null);
  const [lastClickLocation, setLastClickLocation] =
    useState<ClickLocation | null>(null);

  useClickedOutside(containerRef, () => setLastClickLocation('outside'));

  return (
    <Center>
      <VStack>
        <Box
          $bgColor="red"
          $color="white"
          $p="12"
          onClick={() => setLastClickLocation('inside')}
          ref={containerRef}
        >
          Click around to see if inside or outside this box
        </Box>

        {lastClickLocation !== null && (
          <Box>
            Last click was <strong>{lastClickLocation}</strong> the box
          </Box>
        )}
      </VStack>
    </Center>
  );
};
