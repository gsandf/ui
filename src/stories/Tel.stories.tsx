import { Meta, Story } from '@storybook/react';
import React from 'react';
import { CSSProperties } from 'styled-components';
import { simpleUSTelephoneFormat, Tel, TelProps } from '../components';

export default {
  title: 'Typography/Tel',
  component: Tel,
  args: {
    children: '1231231234'
  },
  argTypes: {
    $color: {
      defaultValue: '',
      control: 'color'
    },
    $textTransform: {
      defaultValue: 'none',
      options: [
        'none',
        'capitalize',
        'lowercase',
        'uppercase'
      ] as CSSProperties['textTransform'][],
      control: 'radio'
    }
  }
} as Meta<TelProps>;

export const BasicUsage: Story<TelProps> = (props: TelProps) => (
  <Tel {...props} />
);

export const Formatted: Story<TelProps> = (props: TelProps) => (
  <Tel getFormatted={simpleUSTelephoneFormat} {...props} />
);
