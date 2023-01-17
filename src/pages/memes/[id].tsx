import type { NextPage } from "next";
import { useRouter } from "next/router";
import { Suspense } from "react";

import { ExplorePageNavigation } from "@/components/common/Navigation";
import { MemeDetail } from "@/components/meme/MemeDetail";
import { MemeTagList } from "@/components/meme/MemeDetail/MemeTagList";

const MemeDetailPage: NextPage = () => {
  const { query } = useRouter();

  return (
    <>
      <ExplorePageNavigation />
      {query.id && (
        <Suspense>
          <MemeDetail id={query.id as string} />
          <MemeTagList id={query.id as string} />
        </Suspense>
      )}
    </>
  );
};

export default MemeDetailPage;
