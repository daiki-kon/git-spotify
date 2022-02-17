import useSWR from 'swr';
import useSWRInfinite from 'swr/infinite';

type PlaylistItemsData = {
  added_at: string;
  trackId: string;
  imageUrl: string | undefined;
  trackName: string;
  artistName: string;
}[];

type UseScrollPlaylistItemsResponse = {
  playlistName: string | undefined;
  data: PlaylistItemsData | undefined;
  error: Error | undefined;
  isLast: boolean;
  loadMore: () => void;
};

const LIMIT = 50; // 50件ずつ読み込む
export default function useScrollPlaylistItems(
  accessToken: string | undefined,
  id: string
): UseScrollPlaylistItemsResponse {
  const getKey = (pageIndex: number, previousPageData: any) => {
    if (previousPageData && !previousPageData.length) return null;
    return [
      `/api/spotify/playlist/${id}?page=${pageIndex}&limit=${LIMIT}`,
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

  const { data, error, size, setSize } = useSWRInfinite<
    PlaylistItemsData,
    Error
  >(getKey, fetcher);

  const { data: playlist } = useSWR<{ name: string }>(
    `/api/spotify/playlist/${id}?field=name`,
    (url) => fetcher(url, accessToken)
  );

  // 最新の日付順にソート
  const sortData = (data: PlaylistItemsData): PlaylistItemsData => {
    return data.sort((a, b) => (a.added_at < b.added_at ? 1 : -1));
  };

  const loadMore = () => {
    setSize(size + 1);
  };

  if (data === undefined) {
    return {
      playlistName: undefined,
      data: undefined,
      error,
      isLast: false,
      loadMore,
    };
  }

  const isLast = data?.slice(-1).flat().length !== LIMIT ? true : false;

  return {
    playlistName: playlist?.name,
    data: sortData(data?.flat()),
    error,
    isLast,
    loadMore,
  };
}
