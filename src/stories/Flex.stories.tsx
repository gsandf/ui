import { Meta, Story } from '@storybook/react';
import React from 'react';
import { Box, Center, Flex } from '../components';
import { ThemeMixinProps } from '../theme';

export default {
  title: 'Layout/Flex',
  component: Flex
} as Meta<ThemeMixinProps>;

export const BasicUsage: Story<ThemeMixinProps> = (props: ThemeMixinProps) => (
  <Flex {...props} />
);

BasicUsage.args = {
  children: 'I’m a Flex!',
  $bgColor: 'tomato',
  $color: 'white',
  $p: '2'
};

export const ExampleWithChildren: Story<ThemeMixinProps> = (
  props: ThemeMixinProps
) => (
  <Flex $color="white" {...props}>
    <Center $bgColor="seagreen" $flexBasis="1/2" $p="2">
      Child 1
    </Center>

    <Flex $bgColor="cadetblue" $justifyContent="flex-end" $p="2" $width="1/4">
      Child 2
    </Flex>

    <Box $bgColor="tomato" $p="4" $flexBasis="1/4">
      Child 3
    </Box>
  </Flex>
);
