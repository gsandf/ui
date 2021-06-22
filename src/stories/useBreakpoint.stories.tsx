import { Meta } from '@storybook/react';
import React from 'react';
import { Center } from '../components';
import { useBreakpoint } from '../hooks';

export default {
  title: 'Hooks/useBreakpoint',
  parameters: {
    layout: 'centered'
  }
} as Meta<void>;

export const BasicUsage = () => {
  const breakpoint = useBreakpoint();

  return (
    <Center $bgColor="darken" $p={8}>
      The current breakpoint is {breakpoint}
    </Center>
  );
};

export const WithFilteredBreakpoints = () => {
  const breakpoint = useBreakpoint(['md', 'xxl']);

  return (
    <Center $bgColor="darken" $p={8}>
      Of `base`, `md`, and `xxl`, the current breakpoint is {breakpoint}
    </Center>
  );
};
