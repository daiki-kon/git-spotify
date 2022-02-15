import { Story } from '@storybook/react';
import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';

const withChakra = (Story: Story) => {
  return (
    <ChakraProvider>
      <Story />
    </ChakraProvider>
  );
};

export const decorators = [withChakra];

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
