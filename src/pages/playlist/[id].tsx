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

type PlaylistsProps = {
  session: Session;
};

const Playlists: NextPage<PlaylistsProps> = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const { id } = router.query;

  const { data, error, isLast, loadMore } = useScrollPlaylistItems(
    session?.token.accessToken,
    id as string
  );

  console.log(data);

  return (
    <Stack>
      <Text>{id}</Text>
      {data?.map((item) => (
        <Text key={item.trackId}>{item.added_at}</Text>
      ))}

      {isLast === true ? (
        <></>
      ) : (
        <Button onClick={() => loadMore()}>Load More</Button>
      )}
    </Stack>
  );
};

export default Playlists;
