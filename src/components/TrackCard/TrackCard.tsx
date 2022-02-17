import { Box, HStack, Img, Text } from '@chakra-ui/react';

export type TrackCardProps = {
  trackId: string;
  imageUrl: string | undefined;
  trackName: string;
  artistName: string;
};

const TrackCard = (props: TrackCardProps) => {
  const { imageUrl, trackId, trackName, artistName } = props;

  return (
    <Box key={trackId}>
      <HStack>
        <Img src={imageUrl} boxSize="50px" />
        <Box>
          <Text
            fontSize="1xl"
            maxW={220}
            fontWeight="extrabold"
            display="-webkit-box"
            overflow="hidden"
            sx={{
              WebkitLineClamp: '2',
              WebkitBoxOrient: 'vertical',
            }}
          >
            {trackName}
          </Text>
          <Text>{artistName}</Text>
        </Box>
      </HStack>
    </Box>
  );
};

export default TrackCard;
