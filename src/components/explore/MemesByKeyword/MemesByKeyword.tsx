import { css } from "twin.macro";

import { useGetMemesByKeyword } from "@/application/hooks";
import { InfiniteMemeList, MemeLongPressContainer } from "@/components/meme";

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
      <MemeLongPressContainer memeList={memeList}>
        <InfiniteMemeList memeList={memeList} onEndReached={fetchNextPage} />
      </MemeLongPressContainer>
    </div>
  );
};
