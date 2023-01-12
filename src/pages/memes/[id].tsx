import type { NextPage } from "next";
import { useRouter } from "next/router";
import { Suspense } from "react";

import { ExplorePageNavigation } from "@/components/common/Navigation/ExplorePageNavigation";
import { MemeDetail } from "@/components/meme/MemeDetail";

const MemeDetailPage: NextPage = () => {
  const { query } = useRouter();

  return (
    <>
      <ExplorePageNavigation />
      {query.id && (
        <Suspense>
          <MemeDetail id={query.id as string} />
        </Suspense>
      )}
    </>
  );
};

export default MemeDetailPage;
