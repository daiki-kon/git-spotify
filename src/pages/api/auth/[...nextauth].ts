import NextAuth from 'next-auth';
import SpotifyProvider from 'next-auth/providers/spotify';
import { getSpotifyScope } from '../../../utils/spotify';
import { scope } from '../../../const/spotifyScope';

export default NextAuth({
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID as string,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET as string,
      authorization: `https://accounts.spotify.com/authorize?scope=${getSpotifyScope(
        scope
      )}`,
    }),
  ],
  // NOTE: vercelにデプロイするために必要
  // https://zenn.dev/seiwa/articles/bab4b36966a391
  // https://zenn.dev/tkengineer/articles/5eb78800e9cd5f
  secret: process.env.NEXT_PUBLIC_SECRET,

  callbacks: {
    jwt({ token, account }) {
      if (account) {
        token.id = account.id;
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
      }
      return token;
    },
    session({ session, token }) {
      session.token = token;

      return session;
    },
  },
});
