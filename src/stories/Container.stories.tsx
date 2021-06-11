import { Meta, Story } from '@storybook/react';
import React from 'react';
import { Box, Container } from '../components';
import { ThemeMixinProps } from '../theme';

export default {
  title: 'Layout/Container',
  component: Container,
  args: {
    $bgColor: 'palevioletred',
    $color: 'white',
    $margin: '10px',
    $maxWidth: '1200px',
    $p: '4'
  }
} as Meta<ThemeMixinProps>;

export const BasicUsage: Story<ThemeMixinProps> = (props: ThemeMixinProps) => (
  <Box $bgColor="seashell">
    Parent of the container
    <Container {...props}>
      The container
      <Box $bgColor="papayawhip" $color="black" $p={4}>
        Child of the container
      </Box>
    </Container>
  </Box>
);
