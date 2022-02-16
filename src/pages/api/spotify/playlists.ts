import { NextApiRequest, NextApiResponse } from 'next';
import Spotify from 'next-auth/providers/spotify';
import axios from 'axios';

type SpotifyPlaylists = {
  items: {
    description: string;
    id: string;
    images: {
      height: number;
      url: string;
      width: number;
    }[];
    name: string;
    owner: {
      display_name: string;
    };
    tracks: {
      total: number;
    };
  }[];
};

type GetPlaylistsResponse = {
  description: string;
  id: string;
  imageUrl: string | undefined;
  name: string;
  owner: string;
  tracksCount: number;
}[];

const getPlaylists = async (
  accessToken: string
): Promise<GetPlaylistsResponse> => {
  const playlistsResponse = await axios.get<SpotifyPlaylists>(
    'https://api.spotify.com/v1/me/playlists',
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  return playlistsResponse.data.items.map((item) => ({
    description: item.description,
    id: item.id,
    imageUrl: item.images.length !== 0 ? item?.images[0].url : undefined,
    name: item.name,
    owner: item.owner.display_name,
    tracksCount: item.tracks.total,
  }));
};

export default async function playlists(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log(req.method);
  if (req.method === 'GET') {
    const {
      query: { accessToken },
    } = req;

    if (typeof accessToken !== 'string') {
      return;
    }

    const response = await getPlaylists(accessToken);
    res.status(200).json(response);
  }
}
