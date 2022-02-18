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
import useOrganizeTracks from '../../hooks/useOrganizeTracks';
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

const StyledGraphSVG = ({ isTop }: { isTop: boolean }) => {
  const height = isTop === true ? 110 : 80;
  return (
    <svg width={40} height={height}>
      {isTop === true ? (
        <circle cx="20" cy="10" r="10" fill="#1BD760" />
      ) : (
        <></>
      )}

      <line x1="20" y1="0" x2="20" y2="110" stroke="#1BD760" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
};

const PlaylistGraph = (props: PlaylistGraphProps) => {
  const { items } = props;

  const { data } = useOrganizeTracks(items);
  console.log({ data });
  return (
    <Box>
      {data.map((item, index) => (
        <Flex key={index}>
          <Box>
            <StyledGraphSVG isTop={item.isTop} />
          </Box>
          <Box ml={5}>
            {item.isTop === true ? (
              <Text mb={3}>{item.date}</Text>
            ) : (
              <></>
            )}
            <TrackCard {...item.item} />
          </Box>
        </Flex>
      ))}
    </Box>
  );
};

export default PlaylistGraph;
