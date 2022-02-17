import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import PlaylistGraph from './PlaylistGraph';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'PlaylistGraph',
  component: PlaylistGraph,
} as ComponentMeta<typeof PlaylistGraph>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof PlaylistGraph> = (args) => (
  <PlaylistGraph {...args} />
);

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  items: [
    {
      added_at: '2022-01-01T09:07:42Z',
      trackId: '0ve9Tpz8Yw0I4eXhWsy21o',
      trackName: 'ワタリドリ',
      imageUrl:
        'https://i.scdn.co/image/ab67616d0000b273ee9ddd9ff22b6ea5458b8f29',
      artistName: '[Alexandros]',
    },
    {
      added_at: '2022-01-01T09:07:13Z',
      trackId: '4eJEsPnf9zPjcNhjj5Tx6X',
      trackName: 'センチメンタル',
      imageUrl:
        'https://i.scdn.co/image/ab67616d0000b273789d5121c394c27eac6539c4',
      artistName: 'ORANGE RANGE',
    },
    {
      added_at: '2022-01-01T09:06:37Z',
      trackId: '7mqpXSSr9CBZI8LXEbxWql',
      trackName: 'Ca Va?',
      imageUrl:
        'https://i.scdn.co/image/ab67616d0000b2739a3f2d7be5a98ff1094a97ee',
      artistName: 'Vickeblanka',
    },
    {
      added_at: '2022-01-01T09:06:19Z',
      trackId: '6VJodyic777LVvUXLrtmsQ',
      trackName: '最終電車',
      imageUrl:
        'https://i.scdn.co/image/ab67616d0000b2736fb0ed095258f624e7d7262b',
      artistName: 'Cidergirl',
    },
  ],
};

export const One = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
One.args = {
  items: [
    {
      added_at: '2022-01-01T09:07:42Z',
      trackId: '0ve9Tpz8Yw0I4eXhWsy21o',
      trackName: 'ワタリドリ',
      imageUrl:
        'https://i.scdn.co/image/ab67616d0000b273ee9ddd9ff22b6ea5458b8f29',
      artistName: '[Alexandros]',
    },
  ],
};
