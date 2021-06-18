import { Meta, Story } from '@storybook/react';
import React from 'react';
import { CSSProperties } from 'styled-components';
import { MailTo, MailToProps } from '../components';

export default {
  title: 'Typography/MailTo',
  component: MailTo,
  args: {
    children: 'example@gsandf.com'
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
} as Meta<MailToProps>;

export const BasicUsage: Story<MailToProps> = (props: MailToProps) => (
  <MailTo {...props} />
);
