import { Meta } from '@storybook/react';
import React, { CSSProperties } from 'react';
import { DefaultTheme } from 'styled-components';
import { Center } from '../components';
import { useBreakpointValue } from '../hooks';

export default {
  title: 'Hooks/useBreakpointValue',
  parameters: {
    layout: 'centered'
  }
} as Meta<void>;

type Color = CSSProperties['color'] | keyof DefaultTheme['colors'];

export const BasicUsage = () => {
  const bgColor = useBreakpointValue<Color>({
    base: 'gray900',
    sm: 'gray700',
    md: 'gray600',
    lg: 'gray400',
    xl: 'gray200',
    xxl: 'gray100'
  });

  const fgColor = useBreakpointValue<Color>({
    base: 'black',
    lg: 'white'
  });

  return (
    <Center $bgColor={bgColor} $color={fgColor} $fontWeight="bold" $p={8}>
      Adjust the screen size!
    </Center>
  );
};
