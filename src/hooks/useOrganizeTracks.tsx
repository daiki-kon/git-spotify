import { useEffect, useState } from 'react';

type PlaylistItemData = {
  added_at: string;
  trackId: string;
  imageUrl: string | undefined;
  trackName: string;
  artistName: string;
};

type Item = {
  key: number;
  date: string;
  isTop: boolean;
  item: PlaylistItemData;
};

type UseOrganizeTracksResponse = {
  data: Item[];
};

export default function useOrganizeTracks(
  items: PlaylistItemData[]
): UseOrganizeTracksResponse {
  const [responseDate, setResponseDateDate] = useState<Item[]>([]);

  const formatDate = (
    dateString: string
  ): { key: number; formattedDate: string } => {
    const date = new Date(dateString);

    return {
      key: Number(`${date.getFullYear()}${date.getMonth()}${date.getDate()}`),
      formattedDate: `${date.getFullYear()}年 ${
        date.getMonth() + 1
      }月 ${date.getDate()}日`,
    };
  };

  useEffect(() => {
    items.map((item) => {
      setResponseDateDate((preState) => {
        const { key, formattedDate } = formatDate(item.added_at);

        // preStateの中にkeyと一致するものがなければそのキーはtopになる
        const isTop = preState.some((state) => state.key === key) === false;

        return [
          ...preState,
          {
            isTop,
            date: formattedDate,
            key,
            item: item,
          },
        ];
      });
    });
  }, [items]);

  return { data: responseDate };
}
