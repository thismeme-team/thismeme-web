import { useGetMemesBySort } from "@/application/hooks";
import { InfiniteMemeList } from "@/components/meme";

import type { MemeListType } from "../type";

interface Props {
  sortBy: MemeListType;
}
export const CommonMemeList = ({ sortBy }: Props) => {
  const { data: memeList, fetchNextPage } = useGetMemesBySort(sortBy);

  return <InfiniteMemeList memeList={memeList} onEndReached={fetchNextPage} />;
};
