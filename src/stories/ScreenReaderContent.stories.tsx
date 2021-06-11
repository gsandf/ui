import { Meta } from '@storybook/react';
import React from 'react';
import { Box, ScreenReaderContent } from '../components';
import { ThemeMixinProps } from '../theme';

export default {
  title: 'Layout/ScreenReaderContent',
  component: ScreenReaderContent
} as Meta<ThemeMixinProps>;

export const BasicUsage = () => (
  <Box $bgColor="seashell">
    Check out the inspector to see the hidden text…
    <ScreenReaderContent>
      <Box>This text can be read but not seen!</Box>
    </ScreenReaderContent>
  </Box>
);
