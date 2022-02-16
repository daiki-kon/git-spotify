import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import PlaylistCard from './PlaylistCard';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'PlaylistCard',
  component: PlaylistCard,
} as ComponentMeta<typeof PlaylistCard>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof PlaylistCard> = (args) => (
  <PlaylistCard {...args} />
);

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  coverImageUrl:
    'https://mosaic.scdn.co/640/ab67616d0000b2731e41d9ecc493a1341880bc1cab67616d0000b273c753d46683786eed63d41a90ab67616d0000b273e984d27d0de318dc56f123d4ab67616d0000b273ee9ddd9ff22b6ea5458b8f29',
  name: '通勤',
  id: '7JVjB8poRvbjSnuroDQB8R',
  tracksCount: 54,
  owner: 'daiki',
};

export const LongName = Template.bind({});
LongName.args = {
  coverImageUrl:
    'https://mosaic.scdn.co/640/ab67616d0000b2731e41d9ecc493a1341880bc1cab67616d0000b273c753d46683786eed63d41a90ab67616d0000b273e984d27d0de318dc56f123d4ab67616d0000b273ee9ddd9ff22b6ea5458b8f29',
  name: 'じゅげむじゅげむごこうのすりきれかいじゃりすいぎょのすいぎょうまつうんらいまつふうらいまつくうねるところにすむところやぶらこうじのぶらこうじパイポパイポパイポのシューリンガンシューリンガンのグーリンダイグーリンダイのポンポコピーのポンポコナのちょうきゅうめいのちょうすけ',
  id: '7JVjB8poRvbjSnuroDQB8R',
  tracksCount: 54,
  owner: 'daiki',
};
