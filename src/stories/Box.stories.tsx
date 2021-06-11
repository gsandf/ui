import { Meta, Story } from '@storybook/react';
import React from 'react';
import { Box } from '../components';
import { ThemeMixinProps } from '../theme';

export default {
  title: 'Layout/Box',
  component: Box,
  args: {
    children: 'I’m a Box!',
    $bgColor: 'tomato',
    $color: 'white',
    $p: '4'
  }
} as Meta<ThemeMixinProps>;

export const BasicUsage: Story<ThemeMixinProps> = (props: ThemeMixinProps) => (
  <Box {...props} />
);
