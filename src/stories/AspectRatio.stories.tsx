import { Meta, Story } from '@storybook/react';
import React from 'react';
import { AspectRatio, AspectRatioProps } from '../components';

export default {
  title: 'Layout/AspectRatio',
  component: AspectRatio
} as Meta<AspectRatioProps>;

export const BasicUsage: Story<AspectRatioProps> = props => (
  <AspectRatio {...props}>
    <div>This is a box with a set aspect ratio</div>
  </AspectRatio>
);

BasicUsage.args = {
  ratio: 16 / 9,
  $bgColor: 'tomato',
  $color: 'white',
  $maxWidth: '300px'
};

export const ExampleWithImage: Story<AspectRatioProps> = props => (
  <AspectRatio {...props}>
    <img alt="" src="https://source.unsplash.com/800x800?nature,water" />
  </AspectRatio>
);

ExampleWithImage.args = {
  ratio: 4 / 3,
  $bgColor: 'gray800',
  $maxWidth: '700px'
};

export const ExampleWithIFrameVideo: Story<AspectRatioProps> = props => (
  <AspectRatio {...props}>
    <iframe
      allowFullScreen
      frameBorder="0"
      src="https://www.youtube.com/embed/UiSB2Fbw9gs"
      title="Video: The Midnight - Days of Thunder"
    />
  </AspectRatio>
);

ExampleWithIFrameVideo.args = {
  ratio: 16 / 9,
  $bgColor: 'black',
  $maxWidth: '800px'
};

ExampleWithIFrameVideo.storyName = 'Example With iframe Video';
