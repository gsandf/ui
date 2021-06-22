import { Meta } from '@storybook/react';
import React, { useEffect, useRef, useState } from 'react';
import { Box, Button, Center, HStack, VStack } from '../components';
import { useModalCloseEvent } from '../hooks';

export default {
  title: 'Hooks/useModalCloseEvent',
  parameters: { layout: 'centered' }
} as Meta<void>;

export const BasicUsage = () => {
  const containerRef = useRef(null);
  const timer = useRef(null);
  const [wouldClose, setWouldClose] = useState(false);

  const triggerClose = () => setWouldClose(true);

  useModalCloseEvent(triggerClose, containerRef);

  useEffect(() => {
    if (wouldClose) {
      timer.current = setTimeout(() => {
        setWouldClose(false);
      }, 1000);
    }

    return () => {
      clearTimeout(timer.current);
    };
  }, [wouldClose]);

  const message = wouldClose
    ? 'That would close the dialog!'
    : 'Waiting for events…';

  return (
    <Center>
      <VStack>
        <VStack $bgColor="red" $color="white" $p="12" ref={containerRef}>
          <Box>
            Click around to and press keys to see if the event would close the
            dialog
          </Box>

          <HStack $pt={4} $justify="space-around" $width="full">
            <Button>Do-nothing button</Button>
            <Button onClick={triggerClose}>Close</Button>
          </HStack>
        </VStack>

        <Box>{message}</Box>
      </VStack>
    </Center>
  );
};
