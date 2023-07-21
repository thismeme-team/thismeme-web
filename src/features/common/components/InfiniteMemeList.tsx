import type { UseInfiniteQueryResult } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useMemo } from "react";

import { CORE_QUERY_KEY } from "@/api/core";
import { useGetMemeDetailById } from "@/api/meme";
import { prefetchCollectionCheck } from "@/application/hooks";
import { Masonry } from "@/common/components/Masonry";
import { renderMemeItemSkeletons } from "@/common/components/Skeleton";
import { useIntersect } from "@/common/hooks";
import { MemeItem } from "@/features/common";
import type { GetMemesResponse, Meme } from "@/types";

const skeletons = renderMemeItemSkeletons(4);

const builder = ({ elements, loading = false }: { elements: JSX.Element[]; loading?: boolean }) => {
  if (loading) return elements.concat(skeletons);
  return elements;
};

interface InfiniteMemeListProps {
  memeList: Meme[];
  loading?: boolean;
  onRequestAppend: () => void;
}

export const InfiniteMemeList = ({
  memeList,
  loading = false,
  onRequestAppend,
}: InfiniteMemeListProps) => {
  const ref = useIntersect(onRequestAppend, { rootMargin: "200% 0px" });

  /**
   * @desc
   *  csr 환경에서 빠른 페이지 전환을 위해
   *  밈 상세 데이터를 query cache 에서 pulling 합니다
   */
  const queryClient = useQueryClient();
  const getMemeDetailFromCache = useCallback(
    (id: number) => {
      const data = queryClient.getQueriesData<UseInfiniteQueryResult<GetMemesResponse>["data"]>({
        type: "active",
        queryKey: [CORE_QUERY_KEY.infiniteMemeList],
      });

      let cachedMeme: Meme | undefined;
      data.forEach(([, queryData]) => {
        queryData?.pages.forEach((_) => {
          if (cachedMeme) return;
          cachedMeme = _.memes.find((meme) => meme.memeId === id);
        });
      });

      if (cachedMeme) {
        queryClient.setQueryData(
          useGetMemeDetailById.queryKey(String(cachedMeme.memeId)),
          cachedMeme,
        );

        // NOTE: 조회수 증가를 위해 한번 더 밈 상세 api를 fetch 합니다
        queryClient.invalidateQueries(useGetMemeDetailById.queryKey(String(cachedMeme.memeId)));

        // NOTE: collection check api에 waterfall 현상이 일어나기 때문에 prefetch 합니다
        prefetchCollectionCheck(cachedMeme.memeId, queryClient);
      }
    },
    [queryClient],
  );

  const elements = useMemo(
    () =>
      memeList.map((meme, idx) => {
        return (
          <MemeItem
            key={meme.memeId + idx.toString()} // 중복된 memeId 처리
            meme={meme}
            onClick={getMemeDetailFromCache}
          />
        );
      }),
    [memeList, getMemeDetailFromCache],
  );

  return (
    <>
      <Masonry columns={2} spacing={9}>
        {builder({ elements, loading })}
      </Masonry>
      <div className="h-20" ref={ref} />
    </>
  );
};
