import { useGetMemesBySort } from "@/application/hooks";
import { InfiniteMemeList } from "@/components/home/MemeListContainer/MemeList/InfiniteMemeList";
import type { MemeListType } from "@/components/home/MemeListContainer/type";

interface Props {
  sortBy: MemeListType;
}
export const CommonMemeList = ({ sortBy }: Props) => {
  const { data: memeList, fetchNextPage } = useGetMemesBySort(sortBy);

  return <InfiniteMemeList memeList={memeList} onEndReached={fetchNextPage} />;
};
