import type { NextPage } from "next";

import { DEFAULT_DESCRIPTION, TITLE } from "@/application/util";
import { IntroPageNavigation } from "@/components/common/Navigation";
import { NextSeo } from "@/components/common/NextSeo";
import { PullToRefresh } from "@/components/common/PullToRefresh";
import { MemeListContainer } from "@/components/home";

const HomePage: NextPage = () => {
  return (
    <>
      <NextSeo
        description={DEFAULT_DESCRIPTION}
        openGraph={{ imageUrl: "/open-graph/home.png" }}
        title={TITLE.default}
      />
      <IntroPageNavigation />

      <PullToRefresh>
        <MemeListContainer />
      </PullToRefresh>
    </>
  );
};

export default HomePage;
