import { useGetMemesByKeyword } from "@/api/search";
import { EmptyMemesView, InfiniteMemeList } from "@/features/common";

interface Props {
  keyword: string;
}
export const MemesByKeyword = ({ keyword }: Props) => {
  const {
    data: memeList,
    isFetchingNextPage,
    isEmpty,
    fetchNextPage,
  } = useGetMemesByKeyword(keyword);

  if (isEmpty) {
    return <EmptyMemesView />;
  }

  return (
    <InfiniteMemeList
      loading={isFetchingNextPage}
      memeList={memeList}
      onRequestAppend={() => fetchNextPage({ cancelRefetch: false })}
    />
  );
};
