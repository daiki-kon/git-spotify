import type { NextPage } from 'next';
import { useSession, signOut } from 'next-auth/react';
import { Session } from 'next-auth';
import { useRouter } from 'next/router';
import {
  Box,
  Button,
  Center,
  Container,
  Heading,
  HStack,
  Img,
  Spacer,
  Stack,
} from '@chakra-ui/react';

type PlaylistsProps = {
  session: Session;
};

const Playlists: NextPage<PlaylistsProps> = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const { id } = router.query;

  return (
    <Box>
      <p>Hello!! {id} </p>
    </Box>
  );
};

export default Playlists;
