import {
  Box,
  Button,
  Flex,
  HStack,
  Img,
  Spacer,
  Stack,
  Text,
} from '@chakra-ui/react';
import TrackCard from '../TrackCard';

type PlaylistItem = {
  added_at: string;
  trackId: string;
  imageUrl: string | undefined;
  trackName: string;
  artistName: string;
};

export type PlaylistGraphProps = {
  items: PlaylistItem[];
};

const PlaylistGraph = (props: PlaylistGraphProps) => {
  const { items } = props;

  return (
    <Box>
      {items.map((item, index) => (
        <Flex key={index}>
          <Box>
            <svg width={40} height={110}>
              {items.length - 1 === index ? (
                <></>
              ) : (
                <line x1="20" y1="0" x2="20" y2="200" stroke="#1BD760" strokeWidth="4" />
              )}
              <circle cx="20" cy="10" r="10" fill="#1BD760" />
            </svg>
          </Box>
          <Box>
            <Text mb={3}>{item.added_at}</Text>
            <TrackCard {...item} />
          </Box>
        </Flex>
      ))}
    </Box>
  );
};

export default PlaylistGraph;
