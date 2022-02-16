import useSWRInfinite from 'swr/infinite';

type PlaylistsData = {
  description: string | undefined;
  id: string;
  imageUrl: string | undefined;
  name: string;
  owner: string;
  tracksCount: number;
}[];

type UseScrollPlaylistsResponse = {
  data: PlaylistsData | undefined;
  error: Error | undefined;
  isLast: boolean;
  loadMore: () => void;
};

const LIMIT = 10; // 10件ずつ読み込む
export default function useScrollPlaylists(
  accessToken: string | undefined
): UseScrollPlaylistsResponse {
  const getKey = (pageIndex: number, previousPageData: any) => {
    if (previousPageData && !previousPageData.length) return null; // reached the end
    return [
      `/api/spotify/playlists?page=${pageIndex}&limit=${LIMIT}`,
      accessToken,
    ]; // SWR key
  };

  const fetcher = async (url: string, token: string | undefined) => {
    if (token === undefined) {
      return null;
    }
    const response = await fetch(`${url}&accessToken=${token}`);
    return response.json();
  };

  const { data, error, size, setSize } = useSWRInfinite<PlaylistsData, Error>(
    getKey,
    fetcher
  );

  const loadMore = () => {
    setSize(size + 1);
  };

  if (data === undefined) {
    return {
      data: undefined,
      error,
      isLast: false,
      loadMore,
    };
  }

  const isLast = data?.slice(-1).flat().length !== LIMIT ? true : false;

  return {
    data: data?.flat(),
    error,
    isLast,
    loadMore,
  };
}
