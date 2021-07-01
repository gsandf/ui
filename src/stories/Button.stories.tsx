import { Meta, Story } from '@storybook/react';
import React from 'react';
import { BasicGrid, Button, ButtonProps } from '../components';

export default {
  title: 'Controls/Button',
  component: Button,
  args: {
    disabled: false
  },
  argTypes: {
    onClick: { action: 'clicked' }
  }
} as Meta;

export const Default: Story<ButtonProps> = (props: ButtonProps) => (
  <Button {...props} />
);

Default.args = {
  children: 'Click Me!'
};

export const Colors: Story<Omit<ButtonProps, '$bgColor' | '$bg' | '$color'>> = (
  props: ButtonProps
) => (
  <BasicGrid spacing={4}>
    <Button {...props}>Default</Button>

    <Button {...props} $bgColor="primary" $color="onPrimary">
      Primary
    </Button>

    <Button {...props} $bgColor="accent" $color="onAccent">
      Accent
    </Button>

    <Button {...props} $bgColor="dark" $color="onDark">
      Dark
    </Button>

    <Button {...props} $bgColor="red" $color="textLight">
      Red
    </Button>
  </BasicGrid>
);

export const AsAnchor: Story<unknown> = () => (
  <BasicGrid spacing={4}>
    <Button>I’m a button</Button>

    <Button as="a" href="#">
      I’m an anchor
    </Button>
  </BasicGrid>
);
