import { css } from "twin.macro";

import { useGetMemesByKeyword } from "@/application/hooks";
import { MasonryInfiniteGrid } from "@/components/meme";

import { EmptyMemesView } from "../EmptyMemesView";

interface Props {
  searchQuery: string;
}
export const MemesByKeyword = ({ searchQuery }: Props) => {
  const { data: memeList, isEmpty, fetchNextPage } = useGetMemesByKeyword(searchQuery);

  if (isEmpty) {
    return <EmptyMemesView />;
  }

  return (
    <div
      css={[
        css`
          width: 100%;
          min-height: 450px;
          margin-top: 1.2rem;
        `,
      ]}
    >
      <MasonryInfiniteGrid memeList={memeList} onEndReached={fetchNextPage} />
    </div>
  );
};
