import { useGetMemesBySort } from "@/application/hooks";
import { MasonryInfiniteGrid } from "@/components/meme";

import type { MemeListType } from "../type";

interface Props {
  sortBy: MemeListType;
}
export const CommonMemeList = ({ sortBy }: Props) => {
  const { data: memeList, fetchNextPage } = useGetMemesBySort(sortBy);

  return <MasonryInfiniteGrid memeList={memeList} onEndReached={fetchNextPage} />;
};
