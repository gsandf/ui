import { Meta, Story } from '@storybook/react';
import React from 'react';
import { CSSProperties } from 'styled-components';
import { Container, Text, TextProps } from '../components';

export default {
  title: 'Typography/Text',
  component: Text,
  args: {
    children: 'This is example Text!\nNotice that newlines are preserved...'
  },
  argTypes: {
    $textTransform: {
      defaultValue: 'none',
      options: [
        'none',
        'capitalize',
        'lowercase',
        'uppercase'
      ] as CSSProperties['textTransform'][],
      control: 'radio'
    },
    maxLineCount: {
      defaultvalue: undefined,
      control: 'number'
    }
  }
} as Meta<TextProps>;

export const BasicUsage: Story<TextProps> = (props: TextProps) => (
  <Text {...props} />
);

export const WithThemeProps: Story<TextProps> = (props: TextProps) => (
  <Text {...props} />
);

WithThemeProps.args = {
  $bgColor: 'red',
  $color: 'white',
  $textTransform: 'uppercase'
};

export const TruncateText: Story<TextProps> = (props: TextProps) => (
  <Container $bgColor="accent" $color="onAccent" $p={8}>
    <Text {...props} />
  </Container>
);

TruncateText.args = {
  $textTransform: 'uppercase',
  children:
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam nisi quasi amet possimus enim iure iste! Distinctio ea maiores laboriosam id assumenda at. Provident nesciunt voluptates iste doloribus qui consequatur.',
  maxLineCount: 1
};

export const TruncateMultipleLines: Story<TextProps> = (props: TextProps) => (
  <Container $bgColor="accent" $color="onAccent" $p={8}>
    <Text {...props} />
  </Container>
);

TruncateMultipleLines.args = {
  $textTransform: 'uppercase',
  children:
    'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nisi sed sunt dolorum, in dolore quae assumenda maxime, laboriosam dignissimos fuga at labore officiis harum corporis inventore distinctio quis perspiciatis dolores. Provident omnis optio nam tempora. Corporis officiis dolorum eaque necessitatibus cupiditate libero cumque sit quidem error deserunt facere eos beatae, illum accusamus voluptas obcaecati repellendus quis vitae numquam odio officia?',
  maxLineCount: 3
};
