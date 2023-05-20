import type { NextPage } from "next";

import { DEFAULT_DESCRIPTION, SITE_NAME } from "@/application/util";
import { IntroPageNavigation } from "@/components/common/Navigation";
import type { NextSeoProps } from "@/components/common/NextSeo";
import { NextSeo } from "@/components/common/NextSeo";
import { PullToRefresh } from "@/components/common/PullToRefresh";
import { MemeListContainer } from "@/components/home";

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
