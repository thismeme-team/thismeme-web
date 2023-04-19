import type { NextPage } from "next";
import { useRouter } from "next/router";

import { useScrollDirection } from "@/application/hooks";
import { DEFAULT_DESCRIPTION, TITLE } from "@/application/util";
import { IntroPageNavigation } from "@/components/common/Navigation";
import { NextSeo } from "@/components/common/NextSeo";
import { PullToRefresh } from "@/components/common/PullToRefresh";
import { SSRSuspense } from "@/components/common/Suspense";
import { MemeListContainer } from "@/components/home";
import { SearchInput } from "@/components/search";
import { TagCategory } from "@/components/tags";

const HomePage: NextPage = () => {
  const router = useRouter();
  const direction = useScrollDirection();

  return (
    <>
      <NextSeo
        description={DEFAULT_DESCRIPTION}
        openGraph={{ imageUrl: "/open-graph/home.png" }}
        title={TITLE.default}
      />
      <IntroPageNavigation />

      <PullToRefresh>
        <section
          className={`sticky z-10 flex gap-7 bg-white transition-[top] ${
            direction === "DOWN" ? "top-54" : "top-0"
          }`}
        >
          <SearchInput
            inputMode="none"
            placeholder="당신이 생각한 '그 밈' 검색하기"
            onClick={() => {
              router.push("/search");
            }}
          />
          <SSRSuspense>
            <TagCategory />
          </SSRSuspense>
        </section>
        <MemeListContainer />
      </PullToRefresh>
    </>
  );
};

export default HomePage;
