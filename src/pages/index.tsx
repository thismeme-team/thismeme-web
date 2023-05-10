import type { NextPage } from "next";
import { useRouter } from "next/router";

import { useScrollDirection } from "@/application/hooks";
import { DEFAULT_DESCRIPTION, SITE_NAME } from "@/application/util";
import { IntroPageNavigation } from "@/components/common/Navigation";
import type { NextSeoProps } from "@/components/common/NextSeo";
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
      <NextSeo {...metadata} />
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

const metadata: NextSeoProps = {
  title: `${SITE_NAME} : 무한도전 밈 검색`,
  description: DEFAULT_DESCRIPTION,

  openGraph: {
    siteName: SITE_NAME,
    imageUrl: `/open-graph/home.png`,
  },
  twitter: {
    cardType: "summary_large_image",
  },
};

export default HomePage;
