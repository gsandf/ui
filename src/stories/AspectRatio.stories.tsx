import { Meta, Story } from '@storybook/react';
import React from 'react';
import { AspectRatio, AspectRatioProps } from '../components';

export default {
  title: 'Layout/AspectRatio',
  component: AspectRatio
} as Meta<AspectRatioProps>;

export const BasicUsage: Story<AspectRatioProps> = props => (
  <AspectRatio {...props} />
);

BasicUsage.args = {
  ratio: 16 / 9,
  $bgColor: 'tomato',
  $maxWidth: '300px'
};

export const ExampleWithImage: Story<AspectRatioProps> = props => (
  <AspectRatio {...props}>
    <img src="https://source.unsplash.com/800x800?nature,water" />
  </AspectRatio>
);

ExampleWithImage.args = {
  ratio: 16 / 9,
  $bgColor: 'tomato',
  $maxWidth: '300px'
};
