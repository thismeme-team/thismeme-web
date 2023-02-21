import { css } from "twin.macro";

import { useAuth, useGetMemesBySort, useIntersect } from "@/application/hooks";
import { InfiniteMemeList, MemeLongPressContainer } from "@/components/meme";

export const RelativeMemeList = () => {
  const { data: memeList, fetchNextPage } = useGetMemesBySort("popular");
  const ref = useIntersect(async () => {
    fetchNextPage();
  });
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
        <MemeLongPressContainer memeList={memeList}>
          <InfiniteMemeList memeList={memeList} onEndReached={fetchNextPage} />
        </MemeLongPressContainer>
        <div className="h-20" ref={ref} />
      </div>
    </>
  );
};
