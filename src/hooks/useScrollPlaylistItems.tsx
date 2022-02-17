import useSWRInfinite from 'swr/infinite';

type PlaylistItemsData = {
  added_at: string;
  trackId: string;
  imageUrl: string | undefined;
  trackName: string;
  artistName: string;
}[];

type UseScrollPlaylistItemsResponse = {
  data: PlaylistItemsData | undefined;
  error: Error | undefined;
  isLast: boolean;
  loadMore: () => void;
};

const LIMIT = 20; // 10件ずつ読み込む
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
  
  // 最新の日付順にソート
  const sortData = (data: PlaylistItemsData): PlaylistItemsData => {
    return data.sort((a, b) => (a.added_at < b.added_at ? 1 : -1));
  };

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
    data: sortData(data?.flat()),
    error,
    isLast,
    loadMore,
  };
}
