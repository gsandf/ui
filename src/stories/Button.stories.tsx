import { Meta, Story } from '@storybook/react';
import React from 'react';
import { Button, ButtonProps } from '../components/Button';

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
  <div
    style={{
      display: 'grid',
      gap: '1em',
      gridAutoColumns: 'max-content'
    }}
  >
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
  </div>
);

export const AsAnchor: Story<unknown> = () => (
  <>
    <Button>I’m a button</Button>

    <Button as="a" href="#">
      I’m an anchor
    </Button>
  </>
);
