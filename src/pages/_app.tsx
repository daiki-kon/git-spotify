import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { SessionProvider } from 'next-auth/react';
import Auth from '../Auth';
import Layout from '../components/Layout';
import { useRouter } from 'next/router';

function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const router = useRouter();
  return (
    <ChakraProvider>
      <SessionProvider session={session}>
        <Auth>
          <Layout currentPath={router.pathname} />
          <Component {...pageProps} />
        </Auth>
      </SessionProvider>
    </ChakraProvider>
  );
}

export default App;
