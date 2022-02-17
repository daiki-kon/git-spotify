import { signIn } from 'next-auth/react';
import { NextPage } from 'next';
import {
  Box,
  Button,
  Center,
  Container,
  Heading,
  Img,
  Stack,
} from '@chakra-ui/react';

const Home: NextPage = () => {
  return (
    <Box>
      <Stack>
        <Center>
          {/* TODO:アイコンが決まったら変える */}
          <Img
            borderRadius="full"
            boxSize="150px"
            src="https://2.bp.blogspot.com/-GTehUXjRQoo/U1T3o3WEKYI/AAAAAAAAfUY/BrptEJWip5U/s400/figure_graph_up.png"
            alt="image"
          />
        </Center>
        <Center>
          <Heading size="3xl">graphfy</Heading>
        </Center>

        <Center>
          <Container centerContent mt={10} p={3} m={5}>
            SpotifyのプレイリストをGit
            Graphのように可視化できるWebaアプリケーションです。
            <br />
            アプリケーションを使用するにはSpotifyのアカウントでログインしてください。
          </Container>
        </Center>
        <Center>
          <Button
            colorScheme="teal"
            size="lg"
            ml={20}
            mr={20}
            onClick={() => signIn('spotify')}
          >
            始める!!!!
          </Button>
        </Center>
      </Stack>
    </Box>
  );
};

export default Home;
