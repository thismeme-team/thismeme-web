import type { NextPage } from "next";
import Router from "next/router";

import { DEFAULT_DESCRIPTION, IS_CSR, SITE_NAME } from "@/application/util";
import { IntroPageNavigation } from "@/components/common/Navigation";
import type { NextSeoProps } from "@/components/common/NextSeo";
import { NextSeo } from "@/components/common/NextSeo";
import { PullToRefresh } from "@/components/common/PullToRefresh";
import { MemeListContainer } from "@/components/home";

const HomePage: NextPage = () => {
  // NOTE: 로그인 후 메인 페이지로 먼저 진입 -> 세션 스토리지에 저장된 이전 path로 리다이렉트 시켜야 함.

  if (IS_CSR) {
    const nextPageUrl = sessionStorage.getItem("nextPageUrl");
    if (nextPageUrl) {
      Router.push(nextPageUrl);
      sessionStorage.removeItem("nextPageUrl");
    }
  }

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
