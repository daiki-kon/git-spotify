import { Story } from '@storybook/react';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
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
  viewport: {
    viewports: INITIAL_VIEWPORTS,
  },
};
