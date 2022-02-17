import { Box, HStack, Img, Text } from '@chakra-ui/react';

export type PlaylistCardProps = {
  name: string;
  id: string;
  coverImage: string;
  owner: string;
  tracksCount: number;
  onClickCard: (playlistsId: string) => void;
};

const PlaylistCard = (props: PlaylistCardProps) => {
  const { coverImage, name, id, owner, tracksCount, onClickCard } = props;

  return (
    <Box key={id} maxW={400} onClick={() => onClickCard(id)}>
      <HStack>
        <Img src={coverImage} boxSize="140px" />
        <Box>
          <Text
            fontSize="3xl"
            maxW={220}
            fontWeight="extrabold"
            display="-webkit-box"
            overflow="hidden"
            sx={{
              WebkitLineClamp: '2',
              WebkitBoxOrient: 'vertical',
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
