import type { UseInfiniteQueryResult } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

import { prefetchCollectionCheck, useIntersect } from "@/application/hooks";
import { QUERY_KEYS } from "@/application/hooks/api/meme/queryKey";
import { Masonry } from "@/components/common/Masonry";
import { MemeLongPressContainer } from "@/components/meme";
import { MemeItem } from "@/components/meme/MemeItem";
import type { Meme } from "@/types";

interface Props {
  memeList: Meme[];
  onEndReached: () => void;
}

export const InfiniteMemeList = ({ memeList, onEndReached }: Props) => {
  const ref = useIntersect(onEndReached);

  /**
   * @desc
   *  csr 환경에서 빠른 페이지 전환을 위해
   *  밈 상세 데이터를 query cache 에서 polling 합니다
   */
  const queryClient = useQueryClient();
  const getMemeDetailFromCache = useCallback(
    (id: number) => {
      const data = queryClient.getQueriesData<UseInfiniteQueryResult<{ data: Meme[] }>["data"]>({
        type: "active",
        predicate: ({ queryKey }) => {
          if (typeof queryKey[0] !== "string") return false;
          return queryKey[0].startsWith("@memeList");
        },
      });

      let cachedMeme: Meme | undefined;
      data.map(([, queryData]) => {
        queryData?.pages.map((meme) => {
          cachedMeme = meme.data.find((m) => m.memeId === id);
        });
      });

      if (cachedMeme) {
        queryClient.setQueryData(
          QUERY_KEYS.getMemeDetailById(String(cachedMeme.memeId)),
          cachedMeme,
        );

        // NOTE: 조회수 증가를 위해 한번 더 밈 상세 api를 fetch 합니다
        queryClient.invalidateQueries(QUERY_KEYS.getMemeDetailById(String(cachedMeme.memeId)));

        // NOTE: collection check api에 waterfall 현상이 일어나기 때문에 prefetch 합니다
        prefetchCollectionCheck(cachedMeme.memeId, queryClient);
      }
    },
    [queryClient],
  );

  return (
    <>
      <Masonry columns={2} spacing={9}>
        {memeList.map((meme, idx) => (
          <MemeLongPressContainer key={idx} meme={meme}>
            <MemeItem meme={meme} onClick={getMemeDetailFromCache} />
          </MemeLongPressContainer>
        ))}
      </Masonry>
      <div className="h-20" ref={ref} />
    </>
  );
};
