import { useGetMemesByTag } from "@/api/search";
import { EmptyMemesView, InfiniteMemeList } from "@/features/common";

interface Props {
  tagName: string;
}
export const MemesByTag = ({ tagName }: Props) => {
  const { data: memeList, isEmpty, isFetchingNextPage, fetchNextPage } = useGetMemesByTag(tagName);

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
