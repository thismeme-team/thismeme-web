import { useRouter } from "next/router";

import { PATH } from "@/application/util";

export const useMoveMemeDetail = () => {
  const router = useRouter();
  const searchQueryString = (router.query.q || "") as string;

  const movePage = (memeId: number) => {
    if (router.pathname.startsWith(PATH.getExplorePage())) {
      router.push(PATH.getMemeDetailPage(memeId, searchQueryString));
    } else router.push(PATH.getMemeDetailPage(memeId));
  };

  return { searchQueryString, movePage };
};
