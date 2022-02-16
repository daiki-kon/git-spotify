import type { NextPage } from 'next';
import { useSession, signOut } from 'next-auth/react';
import { Session } from 'next-auth';
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
import useScrollPlaylists from '../hooks/useScrollPlaylists';
import PlaylistCard from '../components/PlaylistCard';

type PlaylistsProps = {
  session: Session;
};

const Playlists: NextPage<PlaylistsProps> = () => {
  const { data: session } = useSession();

  const { data, error, isLast, loadMore } = useScrollPlaylists(
    session?.token.accessToken
  );

  console.log(data);

  if (error) return <div>failed to load</div>;
  if (!data || data[0] === null) return <div>loading...</div>;

  return (
    <Box>
      <Stack>
        <Button
          onClick={() => {
            signOut();
          }}
        >
          Sign out
        </Button>
        {data?.map((item) => (
          <PlaylistCard
            key={item?.id}
            {...item}
            coverImageUrl={
              item?.imageUrl === undefined
                ? 'https://bit.ly/dan-abramov'
                : item.imageUrl
            }
          />
        ))}

        {isLast === true ? (
          <></>
        ) : (
          <Button
            mb={0}
            onClick={() => {
              loadMore();
            }}
          >
            Load More
          </Button>
        )}
      </Stack>
    </Box>
  );
};

export default Playlists;
