import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { SrvRecord } from 'dns';

type SpotifyPlaylistItem = {
  items: {
    added_at: string;
    added_by: { id: string };
    track: {
      id: string;
      name: string;
      album: {
        artists: {
          id: string;
          name: string;
        }[];
        images: {
          height: number;
          url: string;
          width: number;
        }[];
      };
    };
  }[];
};

type GetPlaylistItemsResponse = {
  added_at: string;
  trackId: string;
  imageUrl: string | undefined;
  trackName: string;
  artistName: string;
}[];

const getPlaylistItems = async (
  accessToken: string,
  id: string,
  offset: number,
  limit: number
): Promise<GetPlaylistItemsResponse> => {
  // tracks.items(added_at,added_by.id,track(id,name,album(artists,images)))
  const fields =
    'items(added_at%2Cadded_by.id%2Ctrack(id%2Cname%2Calbum(artists%2Cimages)))';

  const playlistItemsResponse = await axios.get<SpotifyPlaylistItem>(
    `https://api.spotify.com/v1/playlists/${id}/tracks?fields=${fields}&limit=${limit}&offset=${offset}`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  return playlistItemsResponse.data.items.map((item) => ({
    added_at: item.added_at,
    trackId: item.track.id,
    trackName: item.track.name,
    imageUrl:
      item.track.album.images.length !== 0
        ? item.track.album.images[0].url
        : undefined,
    artistName: item.track.album.artists[0].name,
  }));
};

const getPlaylistName = async (
  accessToken: string,
  id: string
): Promise<{name: string}> => {
  const playlistNameResponse = await axios.get<{ name: string }>(
    `https://api.spotify.com/v1/playlists/${id}?fields=name`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  console.log(playlistNameResponse.data);

  return playlistNameResponse.data;
};

export default async function playlistItems(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const {
      query: { accessToken, page, limit, id, field },
    } = req;

    if (typeof accessToken !== 'string') {
      return;
    }

    if (field === 'name') {
      const response = await getPlaylistName(accessToken, id as string);
      res.status(200).json(response);
      return;
    }

    if (typeof page !== 'string' || typeof limit !== 'string') {
      return;
    }

    if (Number(page) === NaN || Number(limit) === NaN) {
      return;
    }

    const offset = Number(page) * Number(limit);

    const response = await getPlaylistItems(
      accessToken,
      id as string,
      Number(offset),
      Number(limit)
    );

    res.status(200).json(response);
  }
}
