import type { NextPage } from "next";
import { useRouter } from "next/router";

import { DEFAULT_DESCRIPTION, TITLE } from "@/application/util";
import { IntroPageNavigation } from "@/components/common/Navigation";
import { NextSeo } from "@/components/common/NextSeo";
import { PullToRefresh } from "@/components/common/PullToRefresh";
import { SSRSuspense } from "@/components/common/Suspense";
import { MemeListContainer, PopularTagList } from "@/components/home";
import { SkeletonTagList } from "@/components/home/Skeleton";
import { SearchInput } from "@/components/search";

const HomePage: NextPage = () => {
  const router = useRouter();

  return (
    <>
      <NextSeo
        description={DEFAULT_DESCRIPTION}
        openGraph={{ imageUrl: "/open-graph/home.png" }}
        title={TITLE.default}
      />
      <IntroPageNavigation />
      <PullToRefresh>
        <section className="pt-8" />
        <SearchInput
          inputMode="none"
          placeholder="당신이 생각한 '그 밈' 검색하기"
          onClick={() => {
            router.push("/search");
          }}
        />
        <SSRSuspense fallback={<SkeletonTagList count={5} />}>
          <PopularTagList />
        </SSRSuspense>
        <section className="pb-40" />
        <MemeListContainer />
      </PullToRefresh>
    </>
  );
};

export default HomePage;
