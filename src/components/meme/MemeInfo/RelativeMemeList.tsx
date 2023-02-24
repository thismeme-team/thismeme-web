import { css } from "twin.macro";

import { useAuth, useGetMemesBySort } from "@/application/hooks";
import { MasonryInfiniteGrid } from "@/components/meme";

export const RelativeMemeList = () => {
  const { data: memeList, fetchNextPage } = useGetMemesBySort("popular");
  const { user } = useAuth();

  return (
    <>
      <h2 className="py-16 font-suit text-22-bold-140">
        {user?.name ? `@${user.name} ` : "당신"}이 찾는 연관 밈
      </h2>
      <div
        css={[
          css`
            width: 100%;
            min-height: 300px;
          `,
        ]}
      >
        <MasonryInfiniteGrid memeList={memeList} onEndReached={fetchNextPage} />
      </div>
    </>
  );
};
