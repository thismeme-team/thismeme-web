import type { NextPage } from "next";
import { useRouter } from "next/router";
import { Suspense } from "react";

import { Navigation } from "@/components/common/Navigation";
import { MemeDetail } from "@/components/meme/MemeDetail";

const MemeDetailPage: NextPage = () => {
  const { query } = useRouter();

  return (
    <>
      <Navigation page="result" />
      {query.id && (
        <Suspense fallback={<div className="text-20-bold-140 text-red-600">fallback test</div>}>
          <MemeDetail id={query.id as string} />
        </Suspense>
      )}
    </>
  );
};

export default MemeDetailPage;
