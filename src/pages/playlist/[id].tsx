import type { NextPage } from 'next';
import { useSession, signOut } from 'next-auth/react';
import { Session } from 'next-auth';
import { useRouter } from 'next/router';
import {
  Box,
  Button,
  Center,
  Container,
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

  const { playlistName, data, error, isLast, loadMore } =
    useScrollPlaylistItems(session?.token.accessToken, id as string);
  if (!data || data[0] === null) return <div>loading...</div>;

  return (
    <Stack>
      <Text>
        {playlistName} : {id}
      </Text>

      <PlaylistGraph items={data} />

      {isLast === true ? (
        <></>
      ) : (
        <Button onClick={() => loadMore()}>Load More</Button>
      )}
    </Stack>
  );
};

export default Playlists;
