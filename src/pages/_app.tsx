import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { SessionProvider } from 'next-auth/react';
import Auth from '../Auth';

function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <ChakraProvider>
      <SessionProvider session={session}>
        <Auth>
          <Component {...pageProps} />
        </Auth>
      </SessionProvider>
    </ChakraProvider>
  );
}

export default App;
