import { Meta, Story } from '@storybook/react';
import React from 'react';
import { Center } from '../components';
import { ThemeMixinProps } from '../theme';

export default {
  title: 'Layout/Center',
  component: Center
} as Meta<ThemeMixinProps>;

export const BasicUsage: Story<ThemeMixinProps> = (props: ThemeMixinProps) => (
  <Center {...props} />
);

BasicUsage.args = {
  children: 'My content is centered',
  $bgColor: 'tomato',
  $color: 'white',
  $p: '6'
};

export const ExampleWithIcon: Story<ThemeMixinProps> = (
  props: ThemeMixinProps
) => (
  <Center {...props}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      width="1em"
      height="1em"
      fill="currentcolor"
      stroke="currentcolor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    >
      <path d="M4 16 C1 12 2 6 7 4 12 2 15 6 16 8 17 6 21 2 26 4 31 6 31 12 28 16 25 20 16 28 16 28 16 28 7 20 4 16 Z" />
    </svg>
  </Center>
);

ExampleWithIcon.args = {
  $bgColor: 'papayawhip',
  $borderRadius: '4px',
  $color: 'palevioletred',
  $height: '3em',
  $p: 2,
  $width: '3em'
};
