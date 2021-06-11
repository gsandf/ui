import { Meta, Story } from '@storybook/react';
import React from 'react';
import { Box, Button, HStack, VStack } from '../components';
import { useLocalStorage } from '../hooks';
import { ThemeMixinProps } from '../theme';

export default {
  title: 'Hooks/useLocalStorage'
} as Meta<ThemeMixinProps>;

export const BasicUsage: Story<ThemeMixinProps> = () => {
  const [value, setValue] = useLocalStorage('basicUsage', 0);

  return (
    <VStack>
      <div>
        <Box>Value stored in localStorage: {value}</Box>

        <HStack $py={3} $justify="space-between">
          <Button onClick={() => setValue(value => value - 1)}>-</Button>
          <Button onClick={() => setValue(0)}>Reset</Button>
          <Button onClick={() => setValue(value => value + 1)}>+</Button>
        </HStack>
      </div>
    </VStack>
  );
};
