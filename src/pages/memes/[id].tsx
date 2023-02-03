import type { NextPage } from "next";
import { useRouter } from "next/router";
import { Suspense } from "react";

import { ExplorePageNavigation } from "@/components/common/Navigation";
import { MemeDetail, MemeTagList } from "@/components/meme/MemeDetail";
import { CollectionSaveButton } from "@/components/meme/MemeDetail/Button/CollectionSaveButton";
import { ShareButton } from "@/components/meme/MemeDetail/Button/ShareButton";

const MemeDetailPage: NextPage = () => {
  const { query } = useRouter();

  return (
    <>
      <ExplorePageNavigation />
      {query.id && (
        <Suspense>
          <MemeDetail id={query.id as string} />
          <MemeTagList id={query.id as string} />
          <div className="flex w-full gap-10 py-40">
            <ShareButton />
            <CollectionSaveButton />
          </div>
        </Suspense>
      )}
    </>
  );
};

export default MemeDetailPage;
