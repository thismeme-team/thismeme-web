import { css } from "twin.macro";

import { useGetRecentMemes, useIntersect } from "@/application/hooks";

import { MemeList } from "./MemeList";

export const RecentMemeList = () => {
  const { data: memeList, fetchNextPage } = useGetRecentMemes();

  const ref = useIntersect(async () => {
    fetchNextPage();
  });

  return (
    <div
      css={[
        css`
          width: 100%;
          min-height: 300px;
        `,
      ]}
    >
      <MemeList memeList={memeList} />
      <div className="h-20" ref={ref} />
    </div>
  );
};
