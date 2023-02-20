import type { RecentSearch } from "@/application/hooks";
import { useGetUserFindMemes } from "@/application/hooks";
import { safeLocalStorage } from "@/application/util";
import { InfiniteMemeList } from "@/components/meme/InfiniteMemeList";
import { MemeLongPressContainer } from "@/components/meme/LongPress";

interface Props {
  userId: number | undefined;
}

export const UserFindMemeList = ({ userId }: Props) => {
  const recentSearch = safeLocalStorage.get("recentSearch");
  const recentSearchArray =
    recentSearch && JSON.parse(recentSearch as string).map((item: RecentSearch) => item.value);
  const recentKeyword =
    recentSearchArray.length < 3 ? recentSearchArray : recentSearchArray.slice(0, 3);

  const { data: memeList, fetchNextPage } = useGetUserFindMemes({
    keywords: recentKeyword.join(),
    userId: userId as number,
  });

  return (
    <MemeLongPressContainer memeList={memeList}>
      <InfiniteMemeList memeList={memeList} onEndReached={fetchNextPage} />;
    </MemeLongPressContainer>
  );
};
