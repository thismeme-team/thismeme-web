import { css } from "twin.macro";

import { useGetMemesByTag, useIntersect } from "@/application/hooks";
import { Masonry } from "@/components/common/Masonry";
import { MemeItem } from "@/components/meme/MemeItem";

import { EmptyMemesView } from "../EmptyMemesView";

interface Props {
  searchQuery: string;
}
export const MemesByTag = ({ searchQuery }: Props) => {
  const { data: memeList, isEmpty, isFetching, fetchNextPage } = useGetMemesByTag(searchQuery);

  const ref = useIntersect(async () => {
    fetchNextPage();
  });

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
      <Masonry columns={2} defaultColumns={2} defaultHeight={450} defaultSpacing={9} spacing={9}>
        {memeList.map((meme) => (
          <MemeItem key={meme.memeId} meme={meme} />
        ))}
      </Masonry>
      <div className={`m-10 ${isFetching ? "hidden" : ""}`} ref={ref}></div>
    </div>
  );
};
