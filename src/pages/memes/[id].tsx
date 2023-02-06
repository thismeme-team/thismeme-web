import type { NextPage } from "next";
import { useRouter } from "next/router";
import { Suspense } from "react";

import { DEFAULT_DESCRIPTION, TITLE } from "@/application/util";
import { ExplorePageNavigation } from "@/components/common/Navigation";
import { NextSeo } from "@/components/common/NextSeo";
import { MemeDetail, MemeTagList } from "@/components/meme/MemeDetail";

const MemeDetailPage: NextPage = () => {
  const { query } = useRouter();

  return (
    <>
      <NextSeo description={DEFAULT_DESCRIPTION} title={TITLE.memeDetail} />
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
