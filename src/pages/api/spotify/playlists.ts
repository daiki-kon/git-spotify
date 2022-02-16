import { NextApiRequest, NextApiResponse } from 'next';
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
  next: string;
  total: number;
};

type GetPlaylistsResponse = {
  description: string | undefined;
  id: string;
  imageUrl: string | undefined;
  name: string;
  owner: string;
  tracksCount: number;
}[];

const getPlaylists = async (
  accessToken: string,
  offset: number,
  limit: number
): Promise<GetPlaylistsResponse> => {
  const playlistsResponse = await axios.get<SpotifyPlaylists>(
    `https://api.spotify.com/v1/me/playlists?offset=${offset}&limit=${limit}`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  return playlistsResponse.data.items.map((item) => ({
    description: item.description === '' ? undefined : item.description,
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
  if (req.method === 'GET') {
    const {
      query: { accessToken, page, limit },
    } = req;

    if (typeof accessToken !== 'string') {
      return;
    }

    if (typeof page !== 'string' || typeof limit !== 'string') {
      return;
    }

    if (Number(page) === NaN || Number(limit) === NaN) {
      return;
    }

    const offset = Number(page) * Number(limit);

    const response = await getPlaylists(
      accessToken,
      Number(offset),
      Number(limit)
    );

    res.status(200).json(response);
  }
}
