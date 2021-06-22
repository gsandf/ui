import { Meta, Story } from '@storybook/react';
import React from 'react';
import { Box, HStack, Stack, StackProps, VStack } from '../components';

const DemoBoxes = () => (
  <>
    <Box $border="3px solid yellow" $p={4}>
      Box 1
    </Box>

    <Box $border="3px solid yellow" $p={4}>
      Box 2
    </Box>

    <Box $border="3px solid yellow" $p={4}>
      Box 3
    </Box>
  </>
);

export default {
  title: 'Layout/Stack',
  component: Stack,
  args: {
    $bgColor: 'red',
    $color: 'white',
    $p: 5,
    children: <DemoBoxes />,
    gap: '10px'
  }
} as Meta<StackProps>;

export const BasicUsage: Story<StackProps> = (props: StackProps) => (
  <Stack {...props} />
);

BasicUsage.args = {
  $color: 'white',
  align: 'normal',
  direction: 'column',
  justify: 'normal',
  wrap: 'no-wrap'
};

export const HorizontalStack: Story<StackProps> = (props: StackProps) => (
  <HStack {...props} />
);

HorizontalStack.args = {
  $px: '16',
  $py: '32',
  align: 'center',
  justify: 'default',
  wrap: 'no-wrap'
};

export const VerticalStack: Story<StackProps> = (props: StackProps) => (
  <VStack {...props} />
);

VerticalStack.args = {
  align: 'center',
  justify: 'default',
  wrap: 'no-wrap'
};
