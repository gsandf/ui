import { Meta, Story } from '@storybook/react';
import React from 'react';
import { Box, Stack, StackProps, HStack, VStack } from '../components';

export default {
  title: 'Layout/Stack',
  component: Stack
} as Meta<StackProps>;

export const BasicUsage: Story<StackProps> = (props: StackProps) => (
  <Stack $bgColor="red" $gap="10px 0" {...props}>
    <Box $border="3px solid yellow" $p={4}>
      Box 1
    </Box>

    <Box $border="3px solid yellow" $p={4}>
      Box 2
    </Box>

    <Box $border="3px solid yellow" $p={4}>
      Box 3
    </Box>
  </Stack>
);

BasicUsage.args = {
  $align: 'default',
  $color: 'white',
  $direction: 'column',
  $gap: '10px 0',
  $justify: 'default',
  $p: '5',
  $wrap: 'no-wrap'
};

export const HorizontalStack: Story<StackProps> = (props: StackProps) => (
  <HStack $bgColor="red" $gap="0 10px" {...props}>
    <Box $border="3px solid yellow" $p={4}>
      Box 1
    </Box>

    <Box $border="3px solid yellow" $p={4}>
      Box 2
    </Box>

    <Box $border="3px solid yellow" $p={4}>
      Box 3
    </Box>
  </HStack>
);

HorizontalStack.args = {
  $align: 'center',
  $color: 'white',
  $gap: '0 10px',
  $justify: 'default',
  $px: '16',
  $py: '32',
  $wrap: 'no-wrap'
};

export const VerticalStack: Story<StackProps> = (props: StackProps) => (
  <VStack $bgColor="red" $gap="10px 0" {...props}>
    <Box $border="3px solid yellow" $p={4}>
      Box 1
    </Box>

    <Box $border="3px solid yellow" $p={4}>
      Box 2
    </Box>

    <Box $border="3px solid yellow" $p={4}>
      Box 3
    </Box>
  </VStack>
);

VerticalStack.args = {
  $align: 'center',
  $color: 'white',
  $gap: '10px 0',
  $justify: 'default',
  $p: '5',
  $wrap: 'no-wrap'
};
