import type { UseInfiniteQueryResult } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

import { useIntersect } from "@/application/hooks";
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
