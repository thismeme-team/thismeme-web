import { useGetMemesBySort } from "@/api/meme";
import { InfiniteMemeList } from "@/features/common";

import type { MemeListType } from "./type";

interface Props {
  sortBy: MemeListType;
}
export const CommonMemeList = ({ sortBy }: Props) => {
  const { data: memeList, isFetchingNextPage, fetchNextPage } = useGetMemesBySort(sortBy);

  return (
    <InfiniteMemeList
      loading={isFetchingNextPage}
      memeList={memeList}
      onRequestAppend={() => fetchNextPage({ cancelRefetch: false })}
    />
  );
};
