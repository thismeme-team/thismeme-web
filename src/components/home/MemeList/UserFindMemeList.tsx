import { css } from "twin.macro";

import { useGetUserFindMemes, useIntersect } from "@/application/hooks";
import { Masonry } from "@/components/common/Masonry";
import { MemeItem } from "@/components/meme/MemeItem";

export const UserFindMemeList = () => {
  const { data: memeList, fetchNextPage } = useGetUserFindMemes();
  //FIX 회원이 찾는 밈 api 형태가 getMemeBySort 와 다를 수 있을 것 같아서 컴포넌트 분리해둠

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
