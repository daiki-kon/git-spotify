import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Layout from './Layout';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Layout',
  component: Layout,
  argTypes: { onClick: { action: 'clicked' } },
} as ComponentMeta<typeof Layout>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Layout> = (args) => (
  <Layout {...args} />
);

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  currentPath: 'playlists'
};
