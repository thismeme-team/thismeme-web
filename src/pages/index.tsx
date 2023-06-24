import type { NextPage } from "next";

import { IntroPageNavigation } from "@/common/components/Navigation";
import type { NextSeoProps } from "@/common/components/NextSeo";
import { NextSeo } from "@/common/components/NextSeo";
import { PullToRefresh } from "@/common/components/PullToRefresh";
import { DEFAULT_DESCRIPTION, SITE_NAME } from "@/common/utils";
import { MemeListContainer } from "@/features/home/components";

const HomePage: NextPage = () => {
  return (
    <>
      <NextSeo {...metadata} />
      <IntroPageNavigation />

      <PullToRefresh>
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
