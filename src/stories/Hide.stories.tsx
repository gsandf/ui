import { Meta, Story } from '@storybook/react';
import React from 'react';
import { BasicGrid, Box, Hide, HideProps } from '../components';
import { defaultTheme } from '../theme';

export default {
  title: 'Layout/Hide',
  component: Hide,
  argTypes: {
    above: {
      control: 'inline-radio',
      options: [undefined, ...Object.keys(defaultTheme.breakpoints)]
    },
    below: {
      control: 'inline-radio',
      defaultValue: 'md',
      options: [undefined, ...Object.keys(defaultTheme.breakpoints)]
    },
    query: { control: 'text' }
  }
} as Meta<HideProps>;

export const BasicUsage: Story<HideProps> = props => <Hide {...props} />;

BasicUsage.args = {
  children: 'This is example text within the `<Hide />`'
};

export const ExampleUsage: Story<void> = () => (
  <BasicGrid columns={2}>
    <Box>Is screen larger than the medium breakpoint?</Box>
    <Box>
      <Hide below="md">✅</Hide>
    </Box>

    <Box>Is screen smaller than the medium breakpoint?</Box>
    <Box>
      <Hide above="md">✅</Hide>
    </Box>

    <Box>Is this a high-density screen?</Box>
    <Box>
      <Hide query="(max-resolution: 1.5dppx)">✅</Hide>
    </Box>

    <Box>Is this a low-density screen?</Box>
    <Box>
      <Hide query="(min-resolution: 1.5dppx)">✅</Hide>
    </Box>
  </BasicGrid>
);

export const MultipleConditions: Story<HideProps> = props => (
  <BasicGrid columns={2}>
    <Box>
      Is screen between the {props.below} and {props.above} breakpoints?
    </Box>
    <Box>
      <Hide {...props}>✅</Hide>
    </Box>
  </BasicGrid>
);

MultipleConditions.args = {
  above: 'xl',
  below: 'sm'
};
