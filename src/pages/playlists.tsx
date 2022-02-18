import type { NextPage } from 'next';
import { useSession, signOut } from 'next-auth/react';
import { Session } from 'next-auth';
import { Box, Button, Stack } from '@chakra-ui/react';
import useScrollPlaylists from '../hooks/useScrollPlaylists';
import PlaylistCard from '../components/PlaylistCard';
import { useRouter } from 'next/router';

type PlaylistsProps = {
  session: Session;
};

const Playlists: NextPage<PlaylistsProps> = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const { data, error, isLast, loadMore } = useScrollPlaylists(
    session?.token.accessToken
  );

  if (error) return <div>failed to load</div>;
  if (!data || data[0] === null) return <div>loading...</div>;

  return (
    <Box>
      <Stack>
        {data?.map((item) => (
          <PlaylistCard
            key={item?.id}
            coverImage={
              item?.imageUrl === undefined
                ? 'http://flat-icon-design.com/f/f_event_22/s256_f_event_22_0bg.png'
                : item.imageUrl
            }
            onClickCard={(playlistId) => router.push(`playlist/${playlistId}`)}
            {...item}
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
