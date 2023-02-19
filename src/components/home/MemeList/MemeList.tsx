import { css } from "twin.macro";

import type { RecentSearch } from "@/application/hooks";
import { useGetUserFindMemes, useIntersect } from "@/application/hooks";
import { safeLocalStorage } from "@/application/util";
import { Masonry } from "@/components/common/Masonry";
import { MemeItem } from "@/components/meme/MemeItem";

export const MemeList = () => {
  const recentSearch = safeLocalStorage.get("recentSearch");
  const recentSearchArray =
    recentSearch && JSON.parse(recentSearch as string).map((item: RecentSearch) => item.value);
  const recentKeyword =
    recentSearchArray.length < 3 ? recentSearchArray : recentSearchArray.slice(0, 3);

  const { data: memeList, fetchNextPage } = useGetUserFindMemes(recentKeyword.join());

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
      <Masonry columns={2} spacing={9}>
        {memeList.map((meme) => (
          <MemeItem key={meme.memeId} meme={meme} />
        ))}
      </Masonry>
      <div className="h-20" ref={ref} />
    </div>
  );
};
