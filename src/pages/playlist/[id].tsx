import type { NextPage } from 'next';
import { useSession, signOut } from 'next-auth/react';
import { Session } from 'next-auth';
import { useRouter } from 'next/router';
import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  GridItem,
  Heading,
  HStack,
  Img,
  Spacer,
  Stack,
  Text,
} from '@chakra-ui/react';
import useScrollPlaylistItems from '../../hooks/useScrollPlaylistItems';
import useSWR from 'swr';
import PlaylistGraph from '../../components/PlaylistGraph';

type PlaylistsProps = {
  session: Session;
};

const Playlists: NextPage<PlaylistsProps> = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const { id } = router.query;

  const {
    playlistName,
    playlistCoverImage,
    playlistTrackTotal,
    data,
    error,
    isLast,
    loadMore,
  } = useScrollPlaylistItems(session?.token.accessToken, id as string);
  if (!data || data[0] === null) return <div>loading...</div>;
  console.log(playlistCoverImage);
  return (
    <Stack>
      <Box>
        <Flex ml={2}>
          <Img src={playlistCoverImage} boxSize="100px"></Img>
          <Box ml={5}>
            <Text fontSize="3xl">{playlistName}</Text>
            <Text>{id}</Text>
            <Text>{playlistTrackTotal} 曲</Text>
          </Box>
        </Flex>
        <Box ml={6} mt={5}>
          <PlaylistGraph items={data} />
        </Box>
      </Box>
      {isLast === true ? (
        <></>
      ) : (
        <Button onClick={() => loadMore()}>Load More</Button>
      )}
    </Stack>
  );
};

export default Playlists;
