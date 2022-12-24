import type { NextPage } from "next";
import { useRouter } from "next/router";

import { Navigation } from "@/components/common/Navigation";
import { MemeDetail } from "@/components/meme/detail";

/**
 * NOTE page 파일 내에서 Suspense fallback 렌더링이 되지 않음...왜일까?
 * @see <MemeDetail />
 *
 * 해결 방법
 * 1. 비동기 요청 컴포넌트를 dynamic import 하면 가능
 * 2. page 파일이 아니라 다른 곳에서 Suspense를 wrapping 하면 가능
 */
const MemeDetailPage: NextPage = () => {
  const { query } = useRouter();

  return (
    <>
      <Navigation page="result" />
      {query.id && <MemeDetail id={query.id as string} />}
    </>
  );
};

export default MemeDetailPage;
