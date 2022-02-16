import { Box, HStack, Img, Text } from '@chakra-ui/react';

export type PlaylistCardProps = {
  name: string;
  id: string;
  coverImageUrl: string;
  owner: string;
  tracksCount: number;
};

const PlaylistCard = (props: PlaylistCardProps) => {
  const { coverImageUrl, name, id, owner, tracksCount } = props;

  return (
    <Box key={id} maxW={400}>
      <HStack>
        <Img src={coverImageUrl} boxSize="140px" />
        <Box>
          <Text
            fontSize="3xl"
            maxW={300}
            fontWeight="extrabold"
            display="-webkit-box"
            overflow="hidden"
            sx={{
              '-webkit-line-clamp': '2',
              '-webkit-box-orient': 'vertical',
            }}
          >
            {name}
          </Text>
          <HStack>
            <Text>{owner}</Text>
            <Text>{tracksCount} 曲</Text>
          </HStack>
        </Box>
      </HStack>
    </Box>
  );
};

export default PlaylistCard;
