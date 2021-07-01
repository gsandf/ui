import { range } from '@blakek/range';
import { Meta, Story } from '@storybook/react';
import React from 'react';
import { BasicGrid, BasicGridProps, Box } from '../components';

export default {
  title: 'Layout/BasicGrid',
  component: BasicGrid,
  argTypes: {
    columns: { control: 'object' },
    minChildWidth: { control: 'object' },
    spacing: { control: 'text' },
    spacingX: { control: 'text' },
    spacingY: { control: 'text' },
    $p: { control: 'text' }
  }
} as Meta<BasicGridProps>;

export const BasicUsageWithColumns: Story<BasicGridProps> = (
  props: BasicGridProps
) => (
  <BasicGrid {...props}>
    {range(1, 10).map(index => (
      <Box $bgColor="red" $color="white" $p="16" key={index}>
        Box {index}
      </Box>
    ))}
  </BasicGrid>
);

BasicUsageWithColumns.args = {
  columns: 3,
  spacing: '8'
};

export const BasicUsageWithMinChildWidth: Story<BasicGridProps> = (
  props: BasicGridProps
) => (
  <BasicGrid {...props}>
    {range(1, 10).map(index => (
      <Box $bgColor="red" $color="white" $p="16" key={index}>
        Box {index}
      </Box>
    ))}
  </BasicGrid>
);

BasicUsageWithMinChildWidth.args = {
  minChildWidth: '330px',
  spacing: '8'
};
