import { Meta } from '@storybook/react';
import React from 'react';
import { Box, Center, VStack } from '../components';
import { useMediaQuery } from '../hooks';

export default {
  title: 'Hooks/useMediaQuery',
  parameters: {
    layout: 'centered'
  }
} as Meta<void>;

const yesNo = (value: boolean) => (value ? 'yes' : 'no');

export const BasicUsage = () => {
  const isLargerThan1000 = useMediaQuery('(min-width: 1000px)');
  const isHighDensityScreen = useMediaQuery('(min-resolution: 1.5dppx)');
  const isBrowser = useMediaQuery('(display-mode: browser)');

  return (
    <Center>
      <VStack $bgColor="darken" $p={8}>
        <Box>Is the screen at least 1000px wide? {yesNo(isLargerThan1000)}</Box>
        <Box>Is this a high-density screen? {yesNo(isHighDensityScreen)}</Box>
        <Box>Is this a browser? {yesNo(isBrowser)}</Box>
      </VStack>
    </Center>
  );
};
