import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import TrackCard from './TrackCard';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'TrackCard',
  component: TrackCard,
  argTypes: { onClick: { action: 'clicked' } },
} as ComponentMeta<typeof TrackCard>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof TrackCard> = (args) => (
  <TrackCard {...args} />
);

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  trackId: '0ve9Tpz8Yw0I4eXhWsy21o',
  trackName: 'ワタリドリ',
  imageUrl: 'https://i.scdn.co/image/ab67616d0000b273ee9ddd9ff22b6ea5458b8f29',
  artistName: '[Alexandros]',
};
