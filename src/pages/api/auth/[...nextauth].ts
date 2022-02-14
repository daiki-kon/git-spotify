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

  callbacks: {
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.
      session.accessToken = token;
      return session;
    },
  },
});
